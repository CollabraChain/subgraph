import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, Bytes } from "@graphprotocol/graph-ts"
import { ProjectCreated } from "../generated/schema"
import { ProjectCreated as ProjectCreatedEvent } from "../generated/CollabraChainFactory/CollabraChainFactory"
import { handleProjectCreated } from "../src/collabra-chain-factory"
import { createProjectCreatedEvent } from "./collabra-chain-factory-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/subgraphs/developing/creating/unit-testing-framework/#tests-structure

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let projectAddress = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let client = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let freelancer = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let newProjectCreatedEvent = createProjectCreatedEvent(
      projectAddress,
      client,
      freelancer
    )
    handleProjectCreated(newProjectCreatedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/subgraphs/developing/creating/unit-testing-framework/#write-a-unit-test

  test("ProjectCreated created and stored", () => {
    assert.entityCount("ProjectCreated", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "ProjectCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "projectAddress",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "ProjectCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "client",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "ProjectCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "freelancer",
      "0x0000000000000000000000000000000000000001"
    )

    // More assert options:
    // https://thegraph.com/docs/en/subgraphs/developing/creating/unit-testing-framework/#asserts
  })
})
