
var seasonalConsumption = {
	'spring': 12.34,
	'summer': 15.36,
	'autumn': 14.25,
	'winter': 15.58
};

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
	// - Certain appliances increase happiness

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
	this.ownerHappinessModifier = null;
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
	this.ownerHappinessModifier = 0.1;
}

WindTurbineFixture.prototype = new FixtureType();
WindTurbineFixture.prototype.constructor = WindTurbineFixture;
function WindTurbineFixture()
{
	this.powerProduced = 1;
	this.ownerHappinessModifier = 0.1;
}


BatteryFixture.prototype = new FixtureType();
BatteryFixture.prototype.constructor = BatteryFixture;
function BatteryFixture()
{
	this.powerStored = 1;
	this.ownerHappinessModifier = 0.15;
}

// Appliances consume power
ApplianceFixtureType.prototype = new FixtureType();
ApplianceFixtureType.prototype.constructor = ApplianceFixtureType;
function ApplianceFixtureType()
{
}

AirConditionerFixture.prototype = new ApplianceFixtureType();
AirConditionerFixture.prototype.constructor = AirConditionerFixture;
function AirConditionerFixture()
{
	this.ownerHappinessModifier = 2;
}

TVFixture.prototype = new ApplianceFixtureType();
TVFixture.prototype.constructor = TVFixture;
function TVFixture()
{
	this.ownerHappinessModifier = 3;
}

ElectricHeater.prototype = new ApplianceFixtureType();
ElectricHeater.prototype.constructor = ElectricHeater;
function ElectricHeater()
{
	this.ownerHappinessModifier = 1.5;
}

function Toolbox()
{
	this.fixtureTypes = {
		'Solar Panel': SolarPanelFixture,
		//'Wind Turbine': WindTurbineFixture,
		//'Battery': BatteryFixture,
		//'Air Conditioner': AirConditionerFixture,
		//'TV': TVFixture
	};
}

function Wallet()
{
	this.balance = 0;
	this.incomePerTimeSlice = 42;
}

Wallet.prototype.payPowerBill = function(consumption)
{
	// FIXME
}

function House()
{
	this.state = "It's not lupus";
	this.fixtures = [];
	this.happinessEngine = new HappinessEngine();
	this.wallet = new Wallet();
	this.happiness = 0;
}

House.prototype.completeTimeSlice = function(season)
{
	var energyProduced = this.getProduction(season);
	var energyConsumed = this.getConsumption(season);
	this.happinessEngine.calculateHappiness(this.wallet, this.fixtures);
}

House.prototype.getProduction = function(season)
{
	// FIXME: Get total production from all fixtures in the house
}

House.prototype.getConsumption = function(season)
{
	// FIXME: Get total consumtpion from all fixtures in the house
	return seasonalConsumption[season];
}

function Neighbourhood()
{
	this.houses = [];
}

function PowerCompany()
{
	// https://www.synergy.net.au/at_home/home_plan_a1_tariff.xhtml
	this.pricePerUnit = 0.257029;
	this.powerGridActive = true;
	this.coalGeneration = 0.8; // FIXME: Assuming 80% of power company's generation capacity is from coal
}

function Environment()
{
	// 1 = awesome, 0 = ok, -1 = poor
	this.airQuality = 1
}

function CalamityGenerator()
{
	// TODO: This can randomly generate calamities
	
	// Clouds
	// - x.powerProduced = 0 for x in allHouses.fixtures where x instanceof SolarPanelFixture
	// Power outages
	// - PowerCompany.powerGridActive = false
	// Smog
	// - Environment.airQuality = -1 if PowerCompany.powerGridActive and PowerCompany.coalGeneration > 0.6
	// Hail
	// - x.powerProduced = 0.5 for x in allHouses.fixtures where x instanceof SolarPanelFixture
	// - FIXME: or maybe panels have hp, which gets reduced until they get destroyed?
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
