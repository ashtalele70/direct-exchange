# The names, email IDs, and students IDs of the members:

Ashwini Ulhas Talele
014483456
ashwiniulhas.talele@sjsu.edu

Belinda Terry
013785668
belinda.terry@sjsu.edu

Mahenaz Sayyed
014605370
Mahenaz.sayyed@sjsu.edu


Varsha Pothaganahalli Jairam
013931242
varsha.pothaganahallijairam@sjsu.edu


# The URL to access your app
http://ec2-54-176-119-51.us-west-1.compute.amazonaws.com:3000/


# Any other instructions necessary for the TA to grade the app:
# Assumptions:
•For offer dashboard page, the filtering is exact, and the filter are "AND" condition while filtering
•If the parties involved in the transaction do not accept the transaction in the window, the offer goes back to either open or expired depending on the expiry date
•For login with Google/Facebook, email become nickname as it has to be unique
•Username refers to email address as mentioned in the specifications - 1.a.i.1. "Generally invisible to other users through the service’s UI." This is what is shown on offer details
•From 10.i. - "When user A is doing business with user B within Direct Exchange ", we have assumed that A has made a payment and then only A can communicate with B
•For google and Facebook signup, the nickname is generated randomly and after logging into the application the user can change the nickname
•Counter offer for a split offer is enabled only if the offer with bigger remit amount involved in the transaction allows counter offer
•If the offer is expired or rejected as per the discussion with Professor, the offer should be open again For the user to check this offer status, we have added rejected/expired offer status before marking the offer as open, which the user can see from my offers page
•User logging in with Google is always a verified user. We used Firebase and as it is Google-owned, the verification is automatically done on Google's end

# Build instructions:
# Backend:
path: direct-exchange/backend
1. mvn clean install
2. docker build -t directexchange .
(note: there is a dot at the end of step 2)
3. docker run -p 8080:8080 directexchange

# Frontend:
path: direct-exchange/frontend
1. npm i
2. npm start






# direct-exchange 

# Enums used- 
is_verified [1:True, 0:False]

bank_type [1: Sending, 2:Recieving, 3:Send&R]

oauth_type[1:Google,2:Facebook, 3:Normal]

is_counter  [1:True, 0:False]

OFFER_STATUS = {"1": "Open", "2": "Fulfilled", "3": "Expired", "4": "Counter Made", "5": "In Transaction","6":"Rejected"}

allow_counter_offer:[1:True, 0:False]

allow_split_offer:[1:True, 0:False]

transaction_status:[1: "Enter Transaction", 2:"At-fault", 3:"Completed", 4: "Cancelled"]

accepted_offer_status:["0": "Accepted", "1":"Paid", "2":"Transaction Not completed"]
