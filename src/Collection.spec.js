describe('Collection', function() {

  var Collection = require('./Collection');
  var SmartModel = require('./SmartModel');

  var user1 = {
    id: 1,
    name: 'Gwen',
    surname: 'Cooper'
  };

  var user2 = {
    id: 2,
    name: 'Jack',
    surname: 'Harkness'
  };

  it('should test some basic collection abilities', function() {

    var smartUser1 = SmartModel.create(user1);
    var smartUser2 = SmartModel.create(user2);

    var torchwoodCollection = Collection.create('Torchwood');

    torchwoodCollection.push(user1);
    torchwoodCollection.push(user2);

    expect(torchwoodCollection.length).toEqual(2);

    var torchwood2Collection = Collection.create('Torchwood');

    expect(torchwoodCollection).toBe(torchwood2Collection);

    expect(torchwood2Collection.length).toEqual(2);

  });

  it('should test lock on calling constructor from outside', function() {
    let constructorWrapper = (data) => () => new Collection(data);

    expect(constructorWrapper(user1)).toThrow();

  });

  it('should test generator iterator on collection', function() {
    let torchwoodCollection = Collection.create('Torchwood');

    expect(torchwoodCollection.length).toEqual(2);

    let counter = 0;
    for(let member of torchwoodCollection) { // Note we are iterating on the object itself, not using any nested properties
      counter++;
    }
    expect(counter).toEqual(2);
  });

  it('should ensure we use different objects for different keys', function() {
    let collectionA = Collection.create('A');
    let collectionB = Collection.create('B');
    expect(collectionA).not.toBe(collectionB);
  });

  it('should ensure we use different objects for different base classes', function() {
    class CollectionA extends Collection {
    };
    class CollectionB extends Collection {
    };

    let collectionAA = CollectionA.create('A');
    let collectionBA = CollectionB.create('A');

    expect(collectionAA).not.toBe(collectionBA);

  }); // That's tricky one, keeping this for later

  it('should ensure we do not use copy inside the collections', function() {
    var data = {
      id: 1,
      name: 'Gwen'
    };
    var user = SmartModel.create(data);

    var torchwoodCollection = Collection.create('Torchwood_test2');
    expect(torchwoodCollection.length).toBe(0);

    torchwoodCollection.push(user);
    expect(torchwoodCollection.length).toBe(1);
    user.lastname = 'Cooper';
    expect(torchwoodCollection[0].lastname).toEqual('Cooper');

  });

})
