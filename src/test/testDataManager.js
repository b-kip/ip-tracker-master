// initializeTestData => testDataManager
  // input: data titles and value. Stored under test Data.
  // return testDataManager with initializedData.

// user should call testDataManager.updateCurrentDataItem
// access currentData from testDataManager.currentDataItem

// requestHandler should reference a data item from a function
// call that accepts optional user input.

/**
 * Creates a testDataManager that randomly selects data item from testData and tracks the current selected data item
 * @param {object} testDataMapper - Object mapping testDataTitle to testData
 */
export function createTestDataManager(testDataMapper, initialData) {
  const getTestData = (testDataTitle) => {
    if (testDataMapper[testDataTitle]) {
      return testDataMapper[testDataTitle]
    } else {
      throw new Error("Data not available");
    }
  };

  const randomlyPickItem = (array) => {
    return array[
      Math.floor(Math.random() * array.length)
    ];
  }

  const testDataManager = {
    currentDataItem: initialData || undefined,
    updateData: function updateData(testDataTitle, { data }={}){
      let testData = getTestData(testDataTitle); // will throw error if you're accessing
      // non-initialized data

      if (data !== undefined) {
        this.currentDataItem = data;
      } else if (this.currentDataItem === undefined) {
        this.currentDataItem = randomlyPickItem(testData);
      } else {
        let newDataItem = this.currentDataItem;
        while (Object.is(newDataItem, this.currentDataItem)) {
          newDataItem = randomlyPickItem(testData);
        }
        this.currentDataItem = newDataItem;
      }

      return this._getDataItem();
    },
    _getDataItem: function() { return this.currentDataItem }
  }

  return {
    testDataManager,
    getData: testDataManager._getDataItem.bind(testDataManager),
  };
}
