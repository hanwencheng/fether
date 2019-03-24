// Copyright 2015-2019 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: BSD-3-Clause

// Disallows users from using Fether with a remote node.
// SSH tunnels are still possible.
//
// References: See trustworthiness of 127.0.0.1 vs localhost: https://letsencrypt.org/docs/certificates-for-localhost/
const TRUSTED_URLS = [
  // Allow open 127.0.0.1 using http in dev mode
  'http://127.0.0.1:3000',
  'wss://127.0.0.1:8546',
  'https://parity.io',
  'https://github.com/paritytech/fether/issues/new',
  'https://api.github.com/repos/paritytech/fether/releases/latest',
  // FIXME - how to add Dev Tools as trusted url?
  'chrome-devtools://devtools/bundled/toolbox.html?remoteBase=https://chrome-devtools-frontend.appspot.com/serve_file/@b216d5f29ba53b9046287cc7de14f9f0759ad091/&can_dock=true&toolbarColor=rgba(223,223,223,1)&textColor=rgba(0,0,0,1)&experiments=true'
];

export { TRUSTED_URLS };
