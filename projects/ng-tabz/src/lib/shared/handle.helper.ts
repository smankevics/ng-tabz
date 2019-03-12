import { IBounds } from '../models/bounds.model';
import { IResizeHandle, IResizeHandleComponent } from '../models/resize-handle.model';
import { ITabz } from '../models/tabz.model';
import { IPositionable } from '../models/positionable.model';

export class HandleHelper {
  private static readonly MIN_SIZE = 30;

  private static checkCollision = (a: IPositionable, b: IPositionable, vertical: boolean): boolean => {
    const ignored = HandleHelper.MIN_SIZE / 2,
      ignoredX = vertical ? 0 : ignored,
      ignoredY = vertical ? ignored : 0;
    if (a.left <= b.left + b.width - ignoredX &&
      a.left + a.width - ignoredX >= b.left &&
      a.top <= b.top + b.height - ignoredY &&
      a.top + a.height - ignoredY >= b.top) {
        return true;
   } else {
     return false;
   }
  }

  public static nextLevelChildren = (ids: string[], groupId: string): string[] => {
    return ids
      .filter(id => id.startsWith(groupId) && id !== groupId)
      .map(id => groupId ? id.replace(groupId + '.', '') : id)
      .map(id => id.split('.')[0])
      .filter((id, i, self) => self.indexOf(id) === i)
      .map(id => groupId ? `${groupId}.${id}` : id);
  }

  public static createResizeHandle = (
    childrenBounds: IBounds[],
    vertical: boolean,
    settings: ITabz
  ): IResizeHandle => {
    const margin = settings.margin || 1;
    childrenBounds.sort((a, b) => {
      if (a.left <= b.left && a.top <= b.top) {
        return -1;
      } else if (a.left > b.left && a.top > b.top) {
        return 1;
      } else {
        return 0;
      }
    });
    const first = childrenBounds[0];
    const last = childrenBounds[childrenBounds.length - 1];

    return vertical ? {
      id: null,
      vertical: true,
      top: first.top,
      left: last.left + last.width,
      height: last.top + last.height - first.top,
      width: 2 + margin
    } : {
      id: null,
      vertical: false,
      top: last.top + last.height,
      left: first.left,
      height: 2 + margin,
      width: last.left + last.width - first.left
    };
  }

  public static checkAndResizeHandles = (
    handles: IResizeHandleComponent[],
    initiator: IResizeHandleComponent,
    bounds: IBounds,
    tabzBounds: IBounds
  ): IResizeHandleComponent[] => {
    if (!initiator) {
      return [];
    }
    const ignored = HandleHelper.MIN_SIZE / 2;

    if (initiator.handle.vertical) {
      const boundaryHandles: IResizeHandleComponent[] = handles
        .filter(item => item !== initiator && item.handle.vertical === initiator.handle.vertical &&
          item.top < initiator.top + initiator.height - ignored && item.height + item.top - ignored > initiator.top
        )
        .reduce((result, item) => ([
          (item.left > (result[0] ? result[0].left : 0) && item.left < initiator.left) ? item : result[0],
          (item.left < (result[1] ? result[1].left : Infinity) && item.left > initiator.left) ? item : result[1]
        ]), [null, null]);

      const minLeft = (boundaryHandles[0] ? boundaryHandles[0].left : 0) + HandleHelper.MIN_SIZE,
        maxLeft = (boundaryHandles[1] ? boundaryHandles[1].left : tabzBounds.width) - HandleHelper.MIN_SIZE;

      let left = bounds.left;
      if (left < minLeft) {
        left = minLeft;
      }
      if (left > maxLeft) {
        left = maxLeft;
      }

      const affectedHandles = handles
        .filter(item => item.handle.vertical !== initiator.handle.vertical)
        .filter(item => HandleHelper.checkCollision(initiator, item, initiator.handle.vertical));

      const dx = initiator.left - left;
      affectedHandles.forEach(item => {
        if (item.left < initiator.left) {
          item.width -= dx;
        } else {
          item.left -= dx;
          item.width += dx;
        }
      });

      initiator.left = left;
      return [
        ...[initiator],
        ...affectedHandles
      ];
    } else {
      const boundaryHandles: IResizeHandleComponent[] = handles
        .filter(item => item !== initiator && item.handle.vertical === initiator.handle.vertical &&
          item.left < initiator.left + initiator.width - ignored && item.left + item.width - ignored > initiator.left
        )
        .reduce((result, item) => ([
          (item.top > (result[0] ? result[0].top : 0) && item.top < initiator.top) ? item : result[0],
          (item.top < (result[1] ? result[1].top : Infinity) && item.top > initiator.top) ? item : result[1]
        ]), [null, null]);

      const minTop = (boundaryHandles[0] ? boundaryHandles[0].top : 0) + HandleHelper.MIN_SIZE,
        maxTop = (boundaryHandles[1] ? boundaryHandles[1].top : tabzBounds.height) - HandleHelper.MIN_SIZE;

      let top = bounds.top;
      if (top < minTop) {
        top = minTop;
      }
      if (top > maxTop) {
        top = maxTop;
      }

      const affectedHandles = handles
        .filter(item => item.handle.vertical !== initiator.handle.vertical)
        .filter(item => HandleHelper.checkCollision(initiator, item, initiator.handle.vertical));

      const dy = initiator.top - top;
      affectedHandles.forEach(item => {
        if (item.top < initiator.top) {
          item.height -= dy;
        } else {
          item.top -= dy;
          item.height += dy;
        }
      });

      initiator.top = top;
      return [
        ...[initiator],
        ...affectedHandles
      ];
    }
  }
}
