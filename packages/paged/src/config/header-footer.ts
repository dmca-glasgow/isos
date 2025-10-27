export type HeaderFooter = Margins & {
  firstPage?: Margins;
};

enum PositionY {
  header = 'header',
  footer = 'footer',
}

enum PositionX {
  left = 'left',
  center = 'center',
  right = 'right',
}

type Text = {
  type: 'text';
  value: string;
};

type ChapterTitle = {
  type: 'chapter-title';
  titleSelector: string;
};

type PageNumber = {
  type: 'page-number';
  template: (num: number, total: number) => string;
};

type Content = Text | ChapterTitle | PageNumber;
type MarginContent = Partial<Record<PositionX, Content>>;
type Margins = Partial<Record<PositionY, MarginContent>>;
