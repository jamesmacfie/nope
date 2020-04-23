require("dotenv").config();
const fetch = require("node-fetch");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const led = async (arg) => {
	if (["c", "h", "a"].indexOf(arg) === -1) {
		return;
	}

	const result = await fetch(
		`https://api.particle.io/v1/devices/${process.env.DEVICE_ID}/led?access_token=${process.env.TOKEN}`,
		{
			headers: {
				"Content-Type": "application/json",
			},
			method: "POST",
			body: JSON.stringify({
				arg,
			}),
		}
	).then((res) => res.json());
	console.log(result);
	return result;
};

const slackCommands = {
	c: "in call",
	h: "headphones",
	a: "available",
};

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api", (_req, res) => {
	res.send(`API works!`);
});

app.post("/api/led/:arg", async (req, res) => {
	console.log("LED going on", req.params.arg);
	await led(req.params.arg);
	res.sendStatus(200);
});

app.post("/api/slack", async (req, res) => {
	console.log("Slack command", req.body);
	const cmd = req.body.text.toLowerCase();
	if (!slackCommands[cmd]) {
		return res.sendStatus(500);
	}
	console.log("Slack command set to", cmd);
	await led(cmd);
	res.send({
		response_type: "in_channel",
		text: `LED set to ${slackCommands[cmd]}`,
	});
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
	console.log("API listening on port", port);
});
