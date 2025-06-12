import { Bytes } from "@graphprotocol/graph-ts";
import {
  Approval as ApprovalEvent,
  ApprovalForAll as ApprovalForAllEvent,
  ReputationMinted as ReputationMintedEvent,
  RoleAdminChanged as RoleAdminChangedEvent,
  RoleGranted as RoleGrantedEvent,
  RoleRevoked as RoleRevokedEvent,
  Transfer as TransferEvent,
} from "../generated/CollabraChainReputation/CollabraChainReputation";
import {
  Approval,
  ApprovalForAll,
  ReputationMinted,
  RoleAdminChanged,
  RoleGranted,
  RoleRevoked,
  Transfer,
  User,
  Project,
  Reputation,
} from "../generated/schema";

export function handleApproval(event: ApprovalEvent): void {
  let entity = new Approval(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.owner = event.params.owner;
  entity.approved = event.params.approved;
  entity.tokenId = event.params.tokenId;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleApprovalForAll(event: ApprovalForAllEvent): void {
  let entity = new ApprovalForAll(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.owner = event.params.owner;
  entity.operator = event.params.operator;
  entity.approved = event.params.approved;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleReputationMinted(event: ReputationMintedEvent): void {
  // Create or load freelancer User
  let freelancer = User.load(event.params.freelancer);
  if (freelancer == null) {
    freelancer = new User(event.params.freelancer);
    freelancer.save();
  }

  // Create or load Project entity (id is projectContract)
  let project = Project.load(event.params.projectContract);
  if (project == null) {
    project = new Project(event.params.projectContract);
    // client and freelancer are unknown here, so leave unset
    project.createdAt = event.block.timestamp;
    project.save();
  }

  // Create Reputation entity (id is tokenId as Bytes)
  const tokenIdBytes = Bytes.fromHexString(event.params.tokenId.toHexString()); // Convert BigInt to Bytes
  let reputation = new Reputation(tokenIdBytes);
  reputation.freelancer = freelancer.id;
  reputation.project = project.id;
  reputation.tokenURI = event.params.tokenURI;
  reputation.mintedAt = event.block.timestamp;
  reputation.save();

  // Save ReputationMinted event entity, referencing Reputation
  let entity = new ReputationMinted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.reputation = reputation.id;
  entity.freelancer = event.params.freelancer;
  entity.projectContract = event.params.projectContract;
  entity.tokenId = tokenIdBytes;
  entity.tokenURI = event.params.tokenURI;
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;
  entity.save();
}

export function handleRoleAdminChanged(event: RoleAdminChangedEvent): void {
  let entity = new RoleAdminChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.role = event.params.role;
  entity.previousAdminRole = event.params.previousAdminRole;
  entity.newAdminRole = event.params.newAdminRole;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleRoleGranted(event: RoleGrantedEvent): void {
  let entity = new RoleGranted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.role = event.params.role;
  entity.account = event.params.account;
  entity.sender = event.params.sender;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleRoleRevoked(event: RoleRevokedEvent): void {
  let entity = new RoleRevoked(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.role = event.params.role;
  entity.account = event.params.account;
  entity.sender = event.params.sender;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleTransfer(event: TransferEvent): void {
  let entity = new Transfer(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.from = event.params.from;
  entity.to = event.params.to;
  entity.tokenId = event.params.tokenId;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}
