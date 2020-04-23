# Nope

Small trio of lights showing availability status.

Has:

- A route to forward light status onto Particle.io
- A route for responding to Slack slash commands
- A docker file for hosting somewhere

Requires:

- A Particle Photon
- A Particle.io account
- A Slack account

Environment variables to create in a `.env` file:

- `DEVICE_ID` The Particle device
- `TOKEN` The Particle API token

Todo:

- Alter Applescript to also change status on Bluetooth headphone connection/disconnection
- Investigate changing status on Slack call or Google Calendar meeting
