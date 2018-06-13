// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import React, { Component } from 'react';
import { accountsInfo$ } from '@parity/light.js';
import Blockies from 'react-blockies';
import { Header } from 'light-ui';
import { inject, observer } from 'mobx-react';
import light from 'light-hoc';

import Health from '../../Health';

@light({
  accountsInfo: accountsInfo$
})
@inject('createAccountStore', 'parityStore')
@observer
class AccountsList extends Component {
  handleClick = ({
    currentTarget: {
      dataset: { address }
    }
  }) => {
    const {
      history,
      parityStore: { api }
    } = this.props;
    // Set default account to the clicked one, and go to Tokens on complete
    // TODO Not 100% clean, I don't want any api.abc.method() in any React
    // component.
    api.parity
      .setNewDappsDefaultAddress(address)
      .then(() => history.push('/tokens'))
      .catch(() => {}); // TODO do what?
  };

  handleCreateAccount = () => {
    this.props.createAccountStore.setIsImporting(false);
    this.props.history.push('/accounts/new');
  };

  render () {
    const { accountsInfo } = this.props;

    return (
      <div>
        <Header
          title={<h1>Accounts</h1>}
          right={
            <a className='icon -new' onClick={this.handleCreateAccount}>
              New account
            </a>
          }
        />

        <div className='window_content'>
          <div className='box -scroller'>
            {accountsInfo ? (
              <ul className='list'>
                {Object.keys(accountsInfo).map(address => (
                  <li
                    key={address}
                    data-address={address} // Using data- to avoid creating a new item Component
                    onClick={this.handleClick}
                  >
                    <div className='account box -card -clickable'>
                      <div className='account_avatar'>
                        <Blockies seed={address.toLowerCase()} />
                      </div>
                      <div className='account_information'>
                        <div className='account_name'>
                          {accountsInfo[address].name}
                        </div>
                        <div className='account_address'>{address}</div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className='loader'>
                <p>Loading&hellip;</p>
              </div>
            )}
          </div>
        </div>

        <nav className='footer-nav'>
          <div className='footer-nav_status'>
            <Health />
          </div>
        </nav>
      </div>
    );
  }
}

export default AccountsList;