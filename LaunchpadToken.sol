
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract LaunchpadToken {
    string public name;
    string public symbol;
    uint8 public constant decimals = 18;
    uint256 public totalSupply;

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);

    constructor(
        string memory name_,
        string memory symbol_,
        uint256 supply_,
        address owner_
    ) {
        require(supply_ > 0, "Supply must be positive");
        require(owner_ != address(0), "Invalid owner");

        name = name_;
        symbol = symbol_;
        totalSupply = supply_ * 10 ** uint256(decimals);

        balanceOf[owner_] = totalSupply;
        emit Transfer(address(0), owner_, totalSupply);
    }

    function transfer(address to, uint256 amount) public returns (bool) {
        require(to != address(0), "Invalid recipient");
        require(balanceOf[msg.sender] >= amount, "Insufficient balance");

        balanceOf[msg.sender] -= amount;
        balanceOf[to] += amount;

        emit Transfer(msg.sender, to, amount);
        return true;
    }

    function approve(address spender, uint256 amount) public returns (bool) {
        allowance[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
        return true;
    }

    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) public returns (bool) {
        require(to != address(0), "Invalid recipient");
        require(balanceOf[from] >= amount, "Insufficient balance");
        require(allowance[from][msg.sender] >= amount, "Not approved");

        allowance[from][msg.sender] -= amount;
        balanceOf[from] -= amount;
        balanceOf[to] += amount;

        emit Transfer(from, to, amount);
        return true;
    }
}

contract LaunchpadFactory {
    event TokenCreated(
        address indexed creator,
        address indexed token,
        string name,
        string symbol,
        uint256 supply
    );

    function createToken(
        string memory name,
        string memory symbol,
        uint256 supply
    ) external returns (address) {
        LaunchpadToken token = new LaunchpadToken(
            name,
            symbol,
            supply,
            msg.sender
        );

        emit TokenCreated(
            msg.sender,
            address(token),
            name,
            symbol,
            supply
        );

        return address(token);
    }
}

