import {
  ProjectCreated as ProjectCreatedEvent,
  RoleAdminChanged as RoleAdminChangedEvent,
  RoleGranted as RoleGrantedEvent,
  RoleRevoked as RoleRevokedEvent
} from "../generated/CollabraChainFactory/CollabraChainFactory"
import {
  ProjectCreated,
  RoleAdminChanged,
  RoleGranted,
  RoleRevoked,
  User,
  Project
} from "../generated/schema"

export function handleProjectCreated(event: ProjectCreatedEvent): void {
  // Create or load client User
  let client = User.load(event.params.client)
  if (client == null) {
    client = new User(event.params.client)
    client.save()
  }

  // Create or load freelancer User
  let freelancer = User.load(event.params.freelancer)
  if (freelancer == null) {
    freelancer = new User(event.params.freelancer)
    freelancer.save()
  }

  // Create Project entity (id is projectAddress as Bytes)
  let project = new Project(event.params.projectAddress)
  project.client = client.id
  project.freelancer = freelancer.id
  project.createdAt = event.block.timestamp
  project.save()

  // Save ProjectCreated event entity, referencing Project
  let entity = new ProjectCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.project = project.id
  entity.client = event.params.client
  entity.freelancer = event.params.freelancer
  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash
  entity.save()
}

export function handleRoleAdminChanged(event: RoleAdminChangedEvent): void {
  let entity = new RoleAdminChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.role = event.params.role
  entity.previousAdminRole = event.params.previousAdminRole
  entity.newAdminRole = event.params.newAdminRole

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRoleGranted(event: RoleGrantedEvent): void {
  let entity = new RoleGranted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.role = event.params.role
  entity.account = event.params.account
  entity.sender = event.params.sender

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRoleRevoked(event: RoleRevokedEvent): void {
  let entity = new RoleRevoked(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.role = event.params.role
  entity.account = event.params.account
  entity.sender = event.params.sender

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
