import { Item, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {
      // normal item test cases
      it('should update the properties of normal items by 1', () => {
        const gildedRose = new GildedRose([new Item("Elixir of the Mongoose", 5, 7)]);
        gildedRose.updateQuality()
        expect(gildedRose.items[0].sellIn).toBe(4);
        expect(gildedRose.items[0].quality).toBe(6);
      });

    it('should degrade the quality of normal items by 2 after crossing sellIn date ', ()=>{
      const gildrose = new GildedRose([new Item("Elixir of the Mongoose", 0 ,8)]);
      gildrose.updateQuality();
      expect(gildrose.items[0].sellIn).toBe(-1)
      expect(gildrose.items[0].quality).toBe(6);
    })

    it("should not let the quality degrade below zero", ()=>{
      const gildRose = new GildedRose([new Item("Elixir of the Mongoose", 0,0)]);
      gildRose.updateQuality();
      expect(gildRose.items[0].quality).toBe(0);
    })

    it('should not decrease quality of normal items below 0 after many updates', () => {
      const item = new Item('Elixir of the Mongoose', 1, 1);
      const gildedRose = new GildedRose([item]);
      for (let i = 0; i < 10; i++) {
        gildedRose.updateQuality();
      }
      expect(item.quality).toBe(0);
      expect(item.sellIn).toBe(-9);
    });

    it('should treat item without names as normal items', () => {
      const gildedRose = new GildedRose([new Item('', 5, 5)]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].sellIn).toBe(4);
      expect(gildedRose.items[0].quality).toBe(4);
    });


    //aged brie test cases
    it('should increase quality of Aged Brie as it gets older', () => {
      const gildedRose = new GildedRose([new Item('Aged Brie', 2, 0)]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].quality).toBe(1);
    });

    it('should not increase quality above 50', () => {
      const gildedRose = new GildedRose([new Item('Aged Brie', 2, 50)]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].quality).toBe(50);
    });

    it('should not increase quality of Aged Brie more than 50 even when sellIn is negative', () => {
      const gildedRose = new GildedRose([new Item('Aged Brie', -1, 50)]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].quality).toBe(50);
    });

    it('should increase Aged Brie quality twice after sell date, but not above max', () => {
      const gildedRose = new GildedRose([new Item('Aged Brie', 0, 48)]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].sellIn).toBe(-1);
      expect(gildedRose.items[0].quality).toBe(50);
    });

    //Sulfuras test cases
    it('should not see change in Sulfuras sellIn or quality', () => {
      const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 0, 80)]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].sellIn).toBe(0);
      expect(gildedRose.items[0].quality).toBe(80);
    });

    // BackStage passes test cases
    describe("Backstage passes", () => {
      it('should increase quality by 1 when sellIn is less than 10 days', () => {
        const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20)]);
        gildedRose.updateQuality();
        expect(gildedRose.items[0].quality).toBe(21);
      });
      it('should increase quality by 2 when there are 10 days or less', () => {
        const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 10, 20)]);
        gildedRose.updateQuality();
        expect(gildedRose.items[0].quality).toBe(22);
      });
      it('should increase quality by 3 when there are 5 days or less', () => {
        const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 5, 20)]);
        gildedRose.updateQuality();
        expect(gildedRose.items[0].quality).toBe(23);
      });
      it('should drop quality to 0 after concert', () => {
        const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 0, 20)]);
        gildedRose.updateQuality();
        expect(gildedRose.items[0].quality).toBe(0);
      });
      it('Quality of Backstage passes should never exceed 50, even with high initial value', () => {
        const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 5, 49)]);
        gildedRose.updateQuality();
        expect(gildedRose.items[0].quality).toBe(50);
      });
      it('Backstage passes already at max quality stays at max quality', () => {
        const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 5, 50)]);
        gildedRose.updateQuality();
        expect(gildedRose.items[0].quality).toBe(50);
      });
      
    });
  

    //conjured items test cases
    it('should degrade Conjured items twice as fast as normal items', () => {
        const gildedRose = new GildedRose([new Item('Conjured Mana Cake', 3, 6)]);
        gildedRose.updateQuality();
        expect(gildedRose.items[0].quality).toBe(4);
        gildedRose.updateQuality();
        expect(gildedRose.items[0].quality).toBe(2);
    });

    it('should decrease Conjured item quality by 4 after sell date', () => {
      const gildedRose = new GildedRose([new Item('Conjured Mana Cake', 0, 10)]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].quality).toBe(6);
    });

    it('quality should drops to zero but not negative after sellIn reaches zero', () => {
      const gildedRose = new GildedRose([new Item('Conjured Mana Cake', 0, 1)]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].quality).toBe(0);
    });

});
