describe('Vehicle', function() {

  beforeEach(function() {
    this.vehicle = new Vehicle({ make: "Ford", model: "Ranger" });
  });

  it("sets the make and model properties when an object is passed in", function() {
    expect(this.vehicle.make).toEqual("Ford");
    expect(this.vehicle.model).toEqual("Ranger");
  });

  it("returns a concatenated string with make and model", function() {
    expect(this.vehicle.toString()).toEqual("Ford Ranger");

    this.vehicle.model = "Explorer";
    expect(this.vehicle.toString()).toEqual("Ford Explorer");
  });

  it("returns a message when the horn is honked", function() {
    expect(this.vehicle.honkHorn()).toMatch(/Beep beep!/);
  });

});
