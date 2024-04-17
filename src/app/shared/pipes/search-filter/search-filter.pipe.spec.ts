import { employeesListDummyData } from '../../dummyData/employees';
import { SearchFilterPipe } from './search-filter.pipe';

describe('SearchFilterPipe', () => {
  it('create an instance', () => {
    const pipe = new SearchFilterPipe();
    expect(pipe).toBeTruthy();
  });

  it('Busqueda por nombre de empleado', () => {
    const pipe = new SearchFilterPipe();
    const name = 'Alberto'

    expect(pipe.transform(employeesListDummyData, name).length > 0).toBeTrue();
  });

  it('Busqueda por email de empleado', () => {
    const pipe = new SearchFilterPipe();
    const email = 'pedro-c@a.com'

    expect(pipe.transform(employeesListDummyData, email)[0]).toEqual(employeesListDummyData[1]);
  });
});
