// https://judge.softuni.org/Contests/Practice/Index/3793#5

function browserHistory(object, array) {
    class Browser {
        constructor(browserName, openTabs, recentlyClosed, browserLogs) {
            this.browserName = browserName;
            this.openTabs = openTabs;
            this.recentlyClosed = recentlyClosed;
            this.browserLogs = browserLogs;
        }

        mapper(commandString) {
            let [command, ...tokens] = commandString.split(" ");
            let commands = {
                Open: (tab) => {
                    this.openTabs.push(tab);
                    this.browserLogs.push(commandString);
                },
                Close: (tab) => {
                    if (!this.openTabs.includes(tab)) return;

                    const idx = this.openTabs.indexOf(tab);
                    this.openTabs.splice(idx, 1);
                    this.recentlyClosed.push(tab);
                    this.browserLogs.push(commandString);
                },
                Clear: () => {
                    this.openTabs = [];
                    this.recentlyClosed = [];
                    this.browserLogs = [];
                },
            };

            commands[command](tokens[0]);
        }

        info() {
            return `${this.browserName}
Open Tabs: ${this.openTabs.join(", ")}
Recently Closed: ${this.recentlyClosed.join(", ")}
Browser Logs: ${this.browserLogs.join(", ")}`;
        }
    }

    // let browser = new Browser(browserObjText);
    // console.log(browser['Open Tabs']);

    let browser = new Browser(
        object["Browser Name"],
        object["Open Tabs"],
        object["Recently Closed"],
        object["Browser Logs"]
    );

    array.forEach((command) => {
        browser.mapper(command);
    });

    console.log(browser.info());
}

// TESTS:

browserHistory(
    {
        "Browser Name": "Google Chrome",
        "Open Tabs": ["Facebook", "YouTube", "Google Translate"],
        "Recently Closed": ["Yahoo", "Gmail"],
        "Browser Logs": [
            "Open YouTube",
            "Open Yahoo",
            "Open Google Translate",
            "Close Yahoo",
            "Open Gmail",
            "Close Gmail",
            "Open Facebook",
        ],
    },
    ["Close Facebook", "Open StackOverFlow", "Open Google"]
);

browserHistory(
    {
        "Browser Name": "Mozilla Firefox",
        "Open Tabs": ["YouTube"],
        "Recently Closed": ["Gmail", "Dropbox"],
        "Browser Logs": [
            "Open Gmail",
            "Close Gmail",
            "Open Dropbox",
            "Open YouTube",
            "Close Dropbox",
        ],
    },
    ["Open Wikipedia", "Clear History and Cache", "Open Twitter"]
);
