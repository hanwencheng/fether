// Copyright 2015-2019 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: BSD-3-Clause

import React, { Component } from 'react';
import { Header } from 'fether-ui';
import { inject, observer } from 'mobx-react';
import { Link, Route } from 'react-router-dom';

import AccountName from './AccountName';
import AccountPassword from './AccountPassword';
import Health from '../../Health';
import i18n, { packageNS } from '../../i18n';
import withAccountsInfo from '../../utils/withAccountsInfo';

@inject('createAccountStore')
@withAccountsInfo
@observer
class EditAccount extends Component {
  constructor (props) {
    super(props);
    props.createAccountStore.clear();
  }

  /**
   * Editing account name and just editing the account password have different processes:
   * 2 steps for edit account name, and 1 steps for edit password
   */
  getSteps = isEditAccountName =>
    isEditAccountName ? [AccountPassword, AccountName] : [AccountPassword];

  handleToggleEditAccountName = () => {
    const {
      createAccountStore,
      history,
      match: {
        params: { step }
      }
    } = this.props;
    createAccountStore.clear();
    createAccountStore.setIsEditAccountName(
      !createAccountStore.isEditAccountName
    );
    // If we were further in the account editing, go back to step 1
    if (step > 1) {
      history.push('/accounts/edit/2');
    }
  };

  render () {
    const {
      accountsInfo,
      createAccountStore: { isEditAccountName, isEditAccountPassword },
      match: {
        params: { step }
      }
    } = this.props;

    // Get all the steps of our account process
    const Steps = this.getSteps(isImport);

    return (
      <React.Fragment>
        <Header
          left={
            // Show back button if we already have some accounts, so we can go back to AccountsList
            accountsInfo &&
            Object.keys(accountsInfo).length > 0 && (
              <Link className='icon -back' to='/accounts'>
                Back
              </Link>
            )
          }
          title={
            <h1>
              {isImport
                ? i18n.t(`${packageNS}:account.import.title`)
                : i18n.t(`${packageNS}:account.create.title`)}
            </h1>
          }
        />

        <div className='window_content'>
          <div className='box -padded'>
            {Steps.map((StepComponent, index) => (
              <Route
                component={StepComponent}
                key={`Step${index + 1}`}
                path={`/accounts/new/${index + 1}`}
              />
            ))}
          </div>
        </div>

        {isImport ? null : (
          <nav className='footer-nav'>
            {step > 1 ? (
              <div className='footer-nav_status'>
                <Health />
              </div>
            ) : (
              <div className='footer-nav_option'>
                <p>
                  {i18n.t(`${packageNS}:account.import.question`)}
                  <button
                    className='button -footer'
                    onClick={this.handleToggleCreateImport}
                  >
                    {i18n.t(`${packageNS}:account.import.title`)}
                  </button>
                </p>
              </div>
            )}
          </nav>
        )}
      </React.Fragment>
    );
  }
}

export default EditAccount;
