import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { getAllAccounts } from '../reducers/accounts'
import { getSupportedCryptos } from '../reducers/cryptos'
import { selectFromAddress, selectToAddress, selectCrypto, enterAmount, transfer } from '../actions'
import AccountItem from '../components/AccountItem'
import AccountsList from '../components/AccountsList'
import AddressDropdown from '../components/AddressDropdown'
import CryptoDropdown from '../components/CryptoDropdown'
import AmountInput from '../components/AmountInput'

const EthereumContainer = ({ accounts, cryptos, selectFromAddress, selectToAddress, selectCrypto, enterAmount, transfer }) => {
  return (
    <div className="container">
      <div className="row">
        <div className="panel panel-primary">
          <div className="panel-heading">
            <h3><b>Ethereum</b> Example React-Redux Truffle Dapp</h3>
          </div>
        </div>
        <div className="panel-body">
          <div className="row">
            <div className="col-sm-10">
              <form className="form-horizontal">
                <AddressDropdown label="From" accounts={accounts} action={selectFromAddress} />
                <AddressDropdown label="To" accounts={accounts} action={selectToAddress} />
                <CryptoDropdown label="Crypto" cryptos={cryptos} action={selectCrypto} />
                <AmountInput label="Amount" action={enterAmount} />
            </form>
            </div>
            <div className="col-sm-1">
              <button type="submit" className="btn btn-primary" onClick={() => transfer()}>Transfer</button>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6">
              <AccountsList title="Accounts">
                {accounts.map(account =>
                  <AccountItem
                    key={account.address}
                    account={account} />
                )}
              </AccountsList>
            </div>
          </div>
        </div>
      </div>
    </div>
)}

EthereumContainer.propTypes = {
  accounts: PropTypes.arrayOf(PropTypes.shape({
    address: PropTypes.string.isRequired,
    balance: PropTypes.object.isRequired
  })).isRequired
}

const mapStateToProps = state => ({
  accounts: getAllAccounts(state.accounts),
  cryptos: getSupportedCryptos(state.cryptos)
})

export default connect(
  mapStateToProps,
  { selectFromAddress, selectToAddress, selectCrypto, enterAmount }
)(EthereumContainer)
