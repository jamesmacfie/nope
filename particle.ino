int ledCall = D7;
int ledHeadphones = D6;
int ledAvailable = D5;

void setup()
{

	pinMode(ledCall, OUTPUT);
	pinMode(ledHeadphones, OUTPUT);
	pinMode(ledAvailable, OUTPUT);

	// Particle function to call
	Particle.function("led", ledToggle);

	// Available by default
	digitalWrite(ledCall, LOW);
	digitalWrite(ledHeadphones, LOW);
	digitalWrite(ledAvailable, HIGH);
}

void loop()
{
	// Nothing to do here
}

int ledToggle(String command)
{
	// On a call
	if (command == "c")
	{
		digitalWrite(ledCall, HIGH);
		digitalWrite(ledHeadphones, LOW);
		digitalWrite(ledAvailable, LOW);
		return 1;
	}
	// Headphones on
	else if (command == "h")
	{
		digitalWrite(ledCall, LOW);
		digitalWrite(ledHeadphones, HIGH);
		digitalWrite(ledAvailable, LOW);
		return 1;
	}
	// Available
	else if (command == "a")
	{
		digitalWrite(ledCall, LOW);
		digitalWrite(ledHeadphones, LOW);
		digitalWrite(ledAvailable, HIGH);
		return 1;
	}
	else
	{
		return -1;
	}
}
