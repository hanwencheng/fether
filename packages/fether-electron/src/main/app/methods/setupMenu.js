// Copyright 2015-2019 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: BSD-3-Clause

import settings from 'electron-settings';

import {
  FetherContextTrayMenu,
  FetherContextWindowMenu,
  FetherMenubarMenu
} from '../menu';
import Pino from '../utils/pino';

const pino = Pino();

function setupMenu (fetherApp) {
  fetherApp.menubarMenu = new FetherMenubarMenu(fetherApp);
  fetherApp.menubarMenu.setMenu();

  // Frontend change language when Fether window loads
  const savedLanguage = settings.get('fether-language');
  fetherApp.win.webContents.emit('set-language', savedLanguage);

  if (fetherApp.options.withTaskbar) {
    fetherApp.contextTrayMenu = new FetherContextTrayMenu(fetherApp);
  }

  fetherApp.contextWindowMenu = new FetherContextWindowMenu(fetherApp);

  /**
   * Toggle the Fether menubar menu in window frame when options `frame: true`.
   * If not shown by default then when shown it may crop the bottom
   * of the window when menu open/close toggled on Windows.
   */
  fetherApp.win.setAutoHideMenuBar(false); // Pressing ALT shows menu bar
  fetherApp.win.setMenuBarVisibility(true);

  pino.info('Finished configuring Electron menu');
}

export default setupMenu;
