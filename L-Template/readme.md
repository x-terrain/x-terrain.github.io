# L-Template 

A framework to store artwork data components onchain by including them as features in the fx-hash smart contract.
The stored data are parameters of a Lindenmayer System, which is a formal grammar that was initially conceived of as a theory 
of plant growth. L-Systems can model complex forms of plants using relatively few simple rules. 

Custom rules are generated during the minting of each token, based on the transaction hash string. 

The idea is that each iteration of the artwork can be reproduced accurately using an L-System interpreter by accessing 
the tezos blockchain through the FxHash API (GraphQL) and interpreting token metadata.  