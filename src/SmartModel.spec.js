describe('SmartModel', function() {

  var SmartModel = require('./SmartModel');

  beforeEach(function() {
    SmartModel.clearCache();
  });

  var user1 = {
    id: 123,
    name: 'Gwen'
  };

  var user2 = {
    id: 123,
    name: 'Gwen',
    lastname: 'Cooper',
  };

  it('should test native JS functions', function() {
    expect(user1).not.toBe(user2);
    expect(user1.lastname).not.toBeDefined();
  });

  it('should test basic SmartModel abilities', function() {

    var smartUser1 = SmartModel.create(user1);
    var smartUser2 = SmartModel.create(user2);

    expect(smartUser1).toBe(smartUser2); // !!!
    expect(smartUser1.lastname).toBeDefined();
    expect(smartUser1.lastname).toEqual(user2.lastname);

  });

  it('should test lock on calling constructor from outside', function() {
    let constructorWrapper = (data) => () => new SmartModel(data)
    expect(constructorWrapper(user1)).toThrow();
  });

  it('should not create SmartModel without valid id', function() {
    let creatorWrapper = (data) => () => SmartModel.create(data);

    let data = {}

    expect(creatorWrapper(data)).toThrow()

  })

  it('should test ability to change key of SmartModel', function() {

    class SuperSmartModel extends SmartModel {
      static getKey() {
        return 'awesomeKey';
      }
    }

    let creatorWrapper = (data) => () => SuperSmartModel.create(data);

    let keyData = {
      awesomeKey: 5
    }

    let idData = {
      id: 5
    };

    expect(creatorWrapper(keyData)).not.toThrow();
    expect(creatorWrapper(idData)).toThrow();

  });

  it('should test whether different subclasses have separate cachces', function() {
    class SmartModelA extends SmartModel {
    };

    class SmartModelB extends SmartModel {

    };

    let modelAobject = SmartModelA.create(user1);
    let modelBobject = SmartModelB.create(user1);

    expect(modelAobject).not.toBe(modelBobject);

  });

  it('should ensure we iterate only by fields provided by us', function() {
    let user = SmartModel.create(user2);
    let counter = 0;
    let possibleFields = ['id', 'name', 'lastname'];

    for(let fieldKey in user) {
      counter++;
      expect(possibleFields).toContain(fieldKey);
    }
    expect(counter).toEqual(possibleFields.length);
  });

});
