import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entities/item.entity';

@Injectable()
export class ItemsService {
  private items: Item[] = [];
  private currentId = 0;

  create(item: Omit<Item, 'id'>) {
    const newItem = {
      ...item,
      id: ++this.currentId,
      name: `${item.name} ${this.currentId}`,
    };
    this.items.push(newItem);
    return newItem;
  }

  findAll() {
    return this.items;
  }

  findOne(id: number) {
    return this.items.find((item) => item.id === id);
  }

  update(id: number, updateItemDto: UpdateItemDto) {
    const itemIndex = this.items.findIndex((item) => item.id === id);

    if (itemIndex > -1) {
      // adding "edit" di akhir kata column yang di edit
      const modifiedUpdateDto = Object.entries(updateItemDto).reduce(
        (acc, [key, value]) => {
          acc[key] = typeof value === 'string' ? `${value} edit` : value;
          return acc;
        },
        {} as UpdateItemDto,
      );

      this.items[itemIndex] = {
        ...this.items[itemIndex],
        ...modifiedUpdateDto,
      };
      return this.items[itemIndex];
    }

    return null;
  }

  remove(id: number) {
    const itemIndex = this.items.findIndex((item) => item.id === id);

    if (itemIndex > -1) {
      const [removeItem] = this.items.splice(itemIndex, 1);
      return removeItem;
    }

    return null;
  }
}
