import { IBounds } from '../models/bounds.model';
import { IResizeHandle, IResizeHandleComponent } from '../models/resize-handle.model';
import { ITabz, ITabzComponent } from '../models/tabz.model';
import { IPositionable } from '../models/positionable.model';

export class ResizeHandleService {
  private readonly MIN_SIZE = 30;

  constructor(private tabz: ITabzComponent) { }

  private get margin(): number {
    return (this.tabz.settings.margin || 0);
  }
  private get collisionError(): number {
    return this.margin + 4;
  }

  public checkCollision = (a: IPositionable, b: IPositionable, vertical: boolean): boolean => {
    const error = vertical ? this.collisionError : -this.collisionError;
    if (a.left - error < b.left + b.width &&
      a.left + a.width + error > b.left &&
      a.top + error < b.top + b.height &&
      a.top + a.height - error > b.top) {
      return true;
    } else {
      return false;
    }
  }

  public nextLevelChildren = (ids: string[], groupId: string): string[] => {
    return ids
      .filter(id => id.startsWith(groupId) && id !== groupId)
      .map(id => groupId ? id.replace(groupId + '.', '') : id)
      .map(id => id.split('.')[0])
      .filter((id, i, self) => self.indexOf(id) === i)
      .map(id => groupId ? `${groupId}.${id}` : id);
  }

  public createResizeHandle = (childrenBounds: IBounds[], vertical: boolean): IResizeHandle => {
    const margin = (this.tabz.settings.margin || 0),
      handleWidth = margin + 2;

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
      top: first.top - margin - 1,
      left: last.left + last.width - 1,
      height: last.top + last.height - first.top + margin * 2 + 2,
      width: handleWidth
    } : {
      id: null,
      vertical: false,
      top: last.top + last.height - 1,
      left: first.left - margin - 1,
      height: handleWidth,
      width: last.left + last.width - first.left + margin * 2 + 2
    };
  }

  public checkAndResizeHandles = (
    handles: IResizeHandleComponent[],
    initiator: IResizeHandleComponent,
    bounds: IBounds,
    tabzBounds: IBounds
  ): IResizeHandleComponent[] => {
    if (!initiator) {
      return [];
    }

    if (initiator.handle.vertical) {
      const boundaryHandles: IResizeHandleComponent[] = handles
        .filter(item => item !== initiator && item.handle.vertical === initiator.handle.vertical &&
          item.top < initiator.top + initiator.height - this.collisionError &&
          item.height + item.top - this.collisionError > initiator.top
        )
        .reduce((result, item) => ([
          (item.left > (result[0] ? result[0].left : 0) && item.left < initiator.left) ? item : result[0],
          (item.left < (result[1] ? result[1].left : Infinity) && item.left > initiator.left) ? item : result[1]
        ]), [null, null]);

      const minLeft = (boundaryHandles[0] ? boundaryHandles[0].left : 0) + this.MIN_SIZE + this.margin,
        maxLeft = (boundaryHandles[1] ? boundaryHandles[1].left : tabzBounds.width) - (this.MIN_SIZE + this.margin);

      let left = bounds.left;
      if (left < minLeft) {
        left = minLeft;
      }
      if (left > maxLeft) {
        left = maxLeft;
      }

      const affectedHandles = handles
        .filter(item => item.handle.vertical !== initiator.handle.vertical)
        .filter(item => this.checkCollision(initiator, item, initiator.handle.vertical));

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
          item.left < initiator.left + initiator.width - this.collisionError &&
          item.left + item.width - this.collisionError > initiator.left
        )
        .reduce((result, item) => ([
          (item.top > (result[0] ? result[0].top : 0) && item.top < initiator.top) ? item : result[0],
          (item.top < (result[1] ? result[1].top : Infinity) && item.top > initiator.top) ? item : result[1]
        ]), [null, null]);

      const minTop = (boundaryHandles[0] ? boundaryHandles[0].top : 0) + this.MIN_SIZE + this.margin,
        maxTop = (boundaryHandles[1] ? boundaryHandles[1].top : tabzBounds.height) - (this.MIN_SIZE + this.margin);

      let top = bounds.top;
      if (top < minTop) {
        top = minTop;
      }
      if (top > maxTop) {
        top = maxTop;
      }

      const affectedHandles = handles
        .filter(item => item.handle.vertical !== initiator.handle.vertical)
        .filter(item => this.checkCollision(initiator, item, initiator.handle.vertical));

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
