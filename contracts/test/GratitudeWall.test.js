import { expect } from "chai";
import { ethers } from "hardhat";

describe("GratitudeWall", function () {
  let contract, owner, tipper;

  beforeEach(async () => {
    [owner, tipper] = await ethers.getSigners();
    const GratitudeWall = await ethers.getContractFactory("GratitudeWall");
    contract = await GratitudeWall.deploy();
  });

  it("posts a note", async () => {
    await contract.connect(owner).postNote("Grateful for open source!");
    const notes = await contract.getNotes();
    expect(notes.length).to.equal(1);
    expect(notes[0].message).to.equal("Grateful for open source!");
    expect(notes[0].poster).to.equal(owner.address);
  });

  it("rejects empty notes", async () => {
    await expect(contract.postNote("")).to.be.revertedWith("Empty note");
  });

  it("tips a note and sends ETH to poster", async () => {
    await contract.connect(owner).postNote("Thank you everyone");
    const tip = ethers.parseEther("0.001");
    const balanceBefore = await ethers.provider.getBalance(owner.address);

    await contract.connect(tipper).tipNote(0, { value: tip });

    const balanceAfter = await ethers.provider.getBalance(owner.address);
    expect(balanceAfter).to.be.gt(balanceBefore);

    const note = await contract.getNote(0);
    expect(note.totalTips).to.equal(tip);
    expect(note.tipCount).to.equal(1);
  });

  it("prevents tipping your own note", async () => {
    await contract.connect(owner).postNote("Self love?");
    await expect(
      contract.connect(owner).tipNote(0, { value: ethers.parseEther("0.001") })
    ).to.be.revertedWith("Cannot tip your own note");
  });
});
