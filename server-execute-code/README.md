This is the Changelog for Judge0 CE. The Changelog for Judge0 Extra CE can be found [here](https://github.com/judge0/judge0/blob/extra/CHANGELOG.md). Learn more about their difference [here](https://github.com/judge0/judge0#flavors).

# v1.13.1 (2024-04-18)

Security researcher [Daniel Cooper](https://www.linkedin.com/in/daniel-cooper4) (@stacksparrow4) found three critical vulnerabilities in Judge0 versions `<= 1.13.0`, which this release fixes. Thank you, Daniel, for your contribution.

## Security Fixes

This release fixes the following security vulnerabilities:

- [CVE-2024-28185](https://github.com/judge0/judge0/security/advisories/GHSA-h9g2-45c8-89cf)
- [CVE-2024-28189](https://github.com/judge0/judge0/security/advisories/GHSA-3xpw-36v7-2cmg)
- [CVE-2024-29021](https://github.com/judge0/judge0/security/advisories/GHSA-q7vg-26pg-v5hr)

## Deployment Procedure

Judge0 is collecting telemetry data to help improve the product and understand its use in various production environments. Read more about telemetry [here](https://github.com/judge0/judge0/blob/v1.13.1/TELEMETRY.md).

#### System Requirements

Please note that Judge0 has only been tested on **Linux** and might not work on other systems; thus, we do not provide support for it.

We recommend using Ubuntu 22.04, on which you need to do the following update of GRUB:

1. Use `sudo` to open file `/etc/default/grub`
2. Add `systemd.unified_cgroup_hierarchy=0` in the value of `GRUB_CMDLINE_LINUX` variable.
3. Apply the changes: `sudo update-grub`
4. Restart your server: `sudo reboot`

Additionally, make sure you have [Docker](https://docs.docker.com) and [Docker Compose](https://docs.docker.com/compose) installed.

#### Deployment Steps

1. Download and extract the release archive:

```
wget https://github.com/judge0/judge0/releases/download/v1.13.1/judge0-v1.13.1.zip
unzip judge0-v1.13.1.zip
```

2. Visit [this website](https://www.random.org/passwords/?num=1&len=32&format=plain&rnd=new) to generate a random password.
3. Use the generated password to update the variable `REDIS_PASSWORD` in the `judge0.conf` file.
4. Visit again [this website](https://www.random.org/passwords/?num=1&len=32&format=plain&rnd=new) to generate another random password.
5. Use the generated password to update the variable `POSTGRES_PASSWORD` in the `judge0.conf` file.
6. Run all services and wait a few seconds until everything is initialized:

```
cd judge0-v1.13.1
docker-compose up -d db redis
sleep 10s
docker-compose up -d
sleep 5s
```

7. Your instance of Judge0 CE v1.13.1 is now up and running; visit docs at:

- `http://<IP ADDRESS OF YOUR SERVER>:2358/docs`
- `http://locallhost:2358/docs`
