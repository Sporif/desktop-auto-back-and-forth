/*
    SPDX-FileCopyrightText: 2024 Sporif <github@mail.sporif.com>

    SPDX-License-Identifier: GPL-2.0-or-later
*/

class DesktopAutoBackAndForthShortcuts {
    constructor() {
        this.previousDesktop = "";

        workspace.currentDesktopChanged.connect(desktop => {
            // print("DABF: previousDesktop is now no. " + desktop.x11DesktopNumber + ", id: " + desktop.id);
            this.previousDesktop = desktop.id;
        });

        for (var i = 1; i < 11; i++) {
            var switchToDesktop = (function (desktop_num, _this) {
                return function () {
                    // print("DABF: Shortcut invoked for desktop no. " + desktop_num);
                    const currentDesktopNum = workspace.currentDesktop.x11DesktopNumber;

                    if (currentDesktopNum == desktop_num) {
                        // print("DABF: currentDesktop is already no. " + desktop_num);
                        if (_this.previousDesktop != null) {
                            // print("DABF: previousDesktop is set, id: " + _this.previousDesktop);
                            for (const desktop of workspace.desktops) {
                                if (desktop.id == _this.previousDesktop) {
                                    // print("DABF: switching currentDesktop to no. " + desktop.x11DesktopNumber + ", id: " + desktop.id);
                                    workspace.currentDesktop = desktop;
                                    break;
                                }
                            }
                        } else {
                            // print("DABF: No previousDesktop");
                        }
                    } else {
                        // print("DABF: currentDesktop is no. " + currentDesktopNum + ", will switch to no. " + desktop_num);
                        for (const desktop of workspace.desktops) {
                            if (desktop.x11DesktopNumber == desktop_num) {
                                // print("DABF: switching currentDesktop to no. " + desktop_num);
                                workspace.currentDesktop = desktop;
                                break;
                            }
                        }
                    }
                };
            })(i, this);

            registerShortcut("Switch to Desktop " + i + " (AutoBackAndForth)", "Switch to Desktop " + i + " (AutoBackAndForth)", "Meta+" + i, switchToDesktop);
        }
    }
}

new DesktopAutoBackAndForthShortcuts();
