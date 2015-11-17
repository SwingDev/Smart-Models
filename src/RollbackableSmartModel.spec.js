describe('RollbackableSmartModel', function() {
  let RollbackableSmartModel = require('./RollbackableSmartModel');
  let SmartModel = require('./SmartModel');

  beforeEach(function() {
    SmartModel.clearCache();
    this.data = {
      id: 1,
      name: 'Gwen',
      surname: 'Cooper'
    };
  });


  it('Should be dumb test of module', function() {

    let user = RollbackableSmartModel.create(this.data);

    expect(user.id).toEqual(this.data.id);
    expect(user.name).toEqual(this.data.name);
    expect(user.name).toEqual(user.rollbackValue('name'));
  });

  it('Should test persistance of rollback values', function() {
    let user = RollbackableSmartModel.create(this.data);

    expect(user.isPristine()).toEqual(true);
    expect(user.isDirty()).toEqual(false);

    user.surname = 'Williams';

    expect(user.surname).toEqual('Williams');
    expect(user.rollbackValue('surname')).toEqual('Cooper');
    expect(user.isDirty()).toEqual(true);
    expect(user.isPristine()).toEqual(false);

    // Rollback ability
    user.rollback();

    expect(user.surname).toEqual('Cooper');
    expect(user.isPristine()).toEqual(true);
    expect(user.isDirty()).toEqual(false);
  });

  it('should test commit abilities', function() {
    let user = RollbackableSmartModel.create(this.data);
    expect(user.isPristine()).toEqual(true);

    user.surname = 'Williams';

    expect(user.isPristine()).toEqual(false);

    user.commit();

    expect(user.isPristine()).toEqual(true);

  });

  it('should test ability to iterate over fields', function() {
    let fields = ['id', 'name', 'surname'];
    let user = RollbackableSmartModel.create(this.data);
    let counter = 0;
    for(let fieldKey in user) {
      counter++;
      expect(fields).toContain(fieldKey);
    }
    expect(counter).toEqual(fields.length);
  });

});
