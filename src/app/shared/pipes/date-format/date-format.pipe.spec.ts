import { DateFormatPipe } from './date-format.pipe';

describe('DateFormatPipe', () => {
  it('create an instance', () => {
    const pipe = new DateFormatPipe();
    expect(pipe).toBeTruthy();
  });

  it('Debe retornar fecha 1991/4/22', () => {
    const pipe = new DateFormatPipe();
    const date = {
      day: 22,
      month: 4,
      year: 1991
    }
    expect(pipe.transform(date)).toEqual('1991/4/22');
  });
});
