
var seasons = ['spring', 'summer', 'autumn', 'winter'];

var seasonalConsumption = {
	'spring': {'3x1': 10.93, "4x2": 14.91, "5x3": 23.52 },
	'summer': {'3x1': 13.61, "4x2": 18.56, "5x3": 29.27 },
	'autumn': {'3x1': 12.62, "4x2": 17.22, "5x3": 27.16 },
	'winter': {'3x1': 13.80, "4x2": 18.83, "5x3": 29.69 }
};

var seasonalProduction = {
	'spring': [9.045, 9.55, 10.465, 13.01],
	'summer': [12.24, 13.34, 14.72, 21.86],
	'autumn': [11.03, 11.92, 14.01, 17.43],
	'winter': [12.87, 13.73, 16.32, 18.02]
};

var seasonLengths = {
	'spring': 91,
	'summer': 90,
	'autumn': 92,
	'winter': 92
};

var sizes = ["3x1","4x2","5x3"];

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

	var totalHappiness = 0;
	totalHappiness += wallet.lastDisposableIncome;
	// Positive influences on happiness
	// - wallet income > wallet expenses
	// - Certain appliances increase happiness

	// Negative influences on happiness
	// - Neighbours have more power-producing fixtures
	if(totalHappiness > 0) return 1;
	if(totalHappiness < 0) return -1;
	return 0;
}


// Base class for fixture types
function FixtureType()
{
	// Each fixture can produce, consume or store a certain amount of power per time slice
	this.powerProduced = null;
	this.powerConsumed = null;
	this.powerStored = null;
	this.ownerHappinessModifier = null;
	this.price = null;
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

SolarPanelFixture.prototype.prices = [3500, 200, 300, 500];

SolarPanelFixture.prototype.nextPrice = function(numberOfExistingPanels)
{
	return this.prices[numberOfExistingPanels];
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
	this.incomePerTimeSlice = 450; // FIXME: magic number
	this.lastDisposableIncome = 0;
}

Wallet.prototype.payPowerBill = function(consumption)
{
	var howMuchIPaid = this.calculateBill(consumption);
	this.lastDisposableIncome = this.incomePerTimeSlice - howMuchIPaid;
	this.balance -= howMuchIPaid;
}

Wallet.prototype.calculateBill = function(consumption)
{
	return consumption * powerCompany.pricePerUnit;
}

Wallet.prototype.earnIncome = function()
{
	// FIXME
	this.balance += this.incomePerTimeSlice;
}

Wallet.prototype.buyFixture = function(price)
{
	this.balance -= price;
}

function House()
{
	this.diagnosis = "It's not lupus";
	this.fixtures = [];
	this.size = sizes[Math.floor(Math.random() * (sizes.length))];
	this.happinessEngine = new HappinessEngine();
	this.wallet = new Wallet();
	this.happiness = 0;
		
	if (this.size == "3x1") {
		this.iconUrl = 'content/house_' + (Math.round(Math.random() * 7) + 1);	
	} else if (this.size == "4x2") {
		this.iconUrl = 'content/house_medium_' + (Math.round(Math.random() * 4) + 1);	
	} else if (this.size == "5x3") {
		this.iconUrl = 'content/house_large_' + (Math.round(Math.random() * 3) + 1);	
	}
}

House.prototype.addFixture = function(fixture)
{
	if(!this.canAffordFixture(fixture)) return;

	if (fixture instanceof SolarPanelFixture && this._solarPanels().length < 4)
	{
		var price = fixture.nextPrice(this._solarPanels().length);
		this.wallet.buyFixture(price);
		this.fixtures.push(fixture);
	}
}

House.prototype.completeTimeSlice = function(season)
{
	this.wallet.earnIncome();
	this.wallet.payPowerBill(this.computeOverallConsumption(season));
	this.happiness = this.happinessEngine.calculateHappiness(this.wallet, this.fixtures);
}

House.prototype.nextPayment = function(season)
{
	return this.wallet.calculateBill(this.computeOverallConsumption(season));
}

House.prototype.computeOverallConsumption = function(season) {
	var energyProduced = this.getProduction(season);
	var energyConsumed = this.getConsumption(season);
	
	var timeSliceDays = seasonLengths[season];

	return (energyConsumed - energyProduced) * timeSliceDays;
}

House.prototype._solarPanels = function()
{
	return this.fixtures.filter(function(fixture){
		return fixture instanceof SolarPanelFixture;
	});
}

House.prototype.getProduction = function(season)
{
	var house = this;

	// FIXME: Get total production from all fixtures in the house
	var totalProduction = 0;
	if (house._solarPanels().length > 0)
	{
		totalProduction = seasonalProduction[season][house._solarPanels().length - 1];
	}

	return totalProduction;
}

House.prototype.getConsumption = function(season)
{
	// FIXME: Get total consumtpion from all fixtures in the house
	return seasonalConsumption[season][this.size];
}

House.prototype.canAffordFixture = function(fixture)
{
	return this.wallet.balance >= fixture.nextPrice(this.fixtures.filter(function(f){
		return f.constructor.name == fixture.constructor.name;
	}).length);
}

function Neighbourhood()
{
	this.houses = [];
}

function PowerCompany()
{
	// https://www.synergy.net.au/at_home/home_plan_a1_tariff.xhtml
	this.pricePerUnit = 0.257029; // per kWh
	this.powerGridActive = true;
	this.coalGeneration = 0.8; // FIXME: Assuming 80% of power company's generation capacity is from coal
}

var powerCompany = new PowerCompany();

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
//var scope;
//scope.globalTime = 0;

// FIXME
// On initial load:
// - set up houses
// On time slice complete (User initiated):
// - For each house:
//   - Complete time slice
