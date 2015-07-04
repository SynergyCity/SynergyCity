// The happiness engine
function HappinessEngine()
{
}

// Return:
// 1  :)
// 0  :|
// -1 :(
HappinessEngine.prototype.calculateHappiness = function(wallet, fixtures)
{
	// FIXME: consider neighbourhood argument

	// Positive influences on happiness
	// - wallet income > wallet expenses

	// Negative influences on happiness
	// - Neighbours have more power-producing fixtures
}


// Base class for fixture types
function FixtureType()
{
	// Each fixture can produce, consume or store a certain amount of power per time slice
	this.powerProduced = null;
	this.powerConsumed = null;
	this.powerStored = null;
}

FixtureType.prototype.getToolboxIcon = function()
{
	return '/path/to/icon.png';
}

SolarPanelFixture.prototype = new FixtureType();
SolarPanelFixture.prototype.constructor = SolarPanelFixture;
function SolarPanelFixture()
{
	this.powerProduced = 1;
}

WindTurbineFixture.prototype = new FixtureType();
WindTurbineFixture.prototype.constructor = WindTurbineFixture;
function WindTurbineFixture()
{
	this.powerProduced = 1;
}


BatteryFixture.prototype = new FixtureType();
BatteryFixture.prototype.constructor = BatteryFixture;
function BatteryFixture()
{
	this.powerStored = 1;
}

// Appliances consume power
ApplianceFixtureType.prototype = new FixtureType();
ApplianceFixtureType.prototype.constructor = ApplianceFixtureType;
function ApplianceFixtureType()
{
}

AirConditionerFixture.prototype = new ApplianceFixtureType();
AirConditionerFixture.prototype.constructor = AirConditionerFixture;
function AirConditionerFixture() {}

TVFixture.prototype = new ApplianceFixtureType();
TVFixture.prototype.constructor = TVFixture;
function TVFixture() {}

function Toolbox()
{
	this.fixtureTypes = {
		'Solar Panel': SolarPanelFixture,
		'Wind Turbine': WindTurbineFixture,
		'Battery': BatteryFixture,
		'Air Conditioner': AirConditionerFixture,
		'TV': TVFixture
	};
}

function Wallet()
{
	this.balance = 0;
	this.incomePerTimeSlice = 42;
}

function House()
{
	this.state = "It's not lupus";
	this.fixtures = [];
	this.happinessEngine = new HappinessEngine();
	this.wallet = new Wallet();
}

House.prototype.completeTimeSlice = function(t)
{
	this.happinessEngine.calculateHappiness(this.wallet, this.fixtures);
}

House.prototype.getProduction = function()
{
	// FIXME: Get total production from all fixtures in the house
}

House.prototype.getConsumption = function()
{
	// FIXME: Get total consumtpion from all fixtures in the house
}

function Neighbourhood()
{
	this.houses = [];
}

function PowerCompany()
{
	// https://www.synergy.net.au/at_home/home_plan_a1_tariff.xhtml
	this.pricePerUnit = 0.257029;
}

// FIXME
var scope;
scope.globalTime = 0;

// FIXME
// On initial load:
// - set up houses
// On time slice complete (User initiated):
// - For each house:
//   - Complete time slice
