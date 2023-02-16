import { Address, BigInt, dataSource, log } from '@graphprotocol/graph-ts'
import { Rarity } from '../../entities/schema'

let ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'
let RARITY_MUMBAI = '0x8eabf06f6cf667915bff30138be70543bce2901a'
let RARITY_MATIC = '0x17113b44fdd661a156cc01b5031e3acf72c32eb3'
let RARITY_FUJI  = '0x9b149112f65ea28a748eaee0f53e8142ad38b52e'

let RARITIES_WITH_ORACLE_MUMBAI = '0xb9957735bbe6d42585058af11aa72da8ead9043a'
let RARITIES_WITH_ORACLE_MATIC = '0xa9158e22f89bb3f69c5600338895cb5fb81e5090'
let RARITIES_WITH_ORACLE_FUJI = '0x57b938e633284b923e63c2d9c97f4a86ddc66fbe'

export function getRarityAddress(): Address {
  
  let network = dataSource.network()
  let addressString = RARITY_FUJI;
  if ( network == 'mumbai') {
    addressString = RARITY_MUMBAI;
  } else if ( network == 'matic') {
    addressString = RARITY_MATIC;
  } else if ( network == 'avax_fuji') {
    addressString = RARITY_FUJI;
  } else {
    addressString = ZERO_ADDRESS;
  }

  return Address.fromString(addressString)
}

export function getRaritiesWithOracleAddress(): Address {
  
  let network = dataSource.network()
  let addressString = RARITIES_WITH_ORACLE_FUJI;
  if ( network == 'mumbai') {
    addressString = RARITIES_WITH_ORACLE_MUMBAI;
  } else if ( network == 'matic') {
    addressString = RARITIES_WITH_ORACLE_MATIC;
  } else if ( network == 'avax_fuji') {
    addressString = RARITIES_WITH_ORACLE_FUJI;
  } else {
    addressString = ZERO_ADDRESS;
  }
  return Address.fromString(addressString)
}

export function handleAddRarity(name: string, price: BigInt, maxSupply: BigInt, currency: string): void {
  let rarity = Rarity.load(name)

  if (rarity === null) {
    rarity = new Rarity(name)
  } else if (rarity.currency != currency) {
    log.info('Ignoring because it was not added with the current Rarity Contract', [])
    return
  }

  rarity.name = name
  rarity.price = price
  rarity.maxSupply = maxSupply
  rarity.currency = currency
  rarity.save()
}

export function handleUpdatePrice(name: string, price: BigInt, currency: string): void {
  let rarity = Rarity.load(name)

  if (rarity === null) {
    log.error('Rarity with name {} not found', [name])
    return
  }

  if (rarity.currency != currency) {
    log.info('Ignoring because it was not added with the current Rarity Contract', [])
    return
  }

  rarity.price = price
  rarity.currency = currency
  rarity.save()
}
