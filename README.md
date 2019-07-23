# Practice Inventory App
This app will be a mock inventory system for a store. Users (employees) can log in and enter items into inventory. Employees can then search for items in the inventory and also "scan" (basically mock the IDs that would be on a scanned barcode) to get information about an item or also mark it as sold. Also employees can create reports about items sold on a specific day, how much has sold in a certain timespan, and other stuff when I think of more features.

User Endpoints:
POST - /user - creates a new user (employee for the store)
POST - /user/login - logs a user (employee) in
POST - /user/logout - logs out the current user (removes the token)

Item Endpoints:
POST - /item - creates a new item and adds it to inventory
GET - /item/:id - pulls an item by ID (for an actual store the ID could be like a scanned barcode or something similar)
GET - /item/search/:search - does a wildcard search of the inventory names (for example "pizza" would ideally pull back any name containing "pizza")
DELETE - /item/:id - deletes an item from the inventory based on the ID (also could be a barcode in a real store situation)
PATCH - /item/:id - updates an item in the inventory (validates the fields that are passed for updating too)
GET - /item/get/day - gets all items uploaded in the last 24 hours
GET - /item/get/week - gets all items uploaded in the past week

Future Considerations:
- More testing...
- Further expansion of inventory abilities i.e. further reporting abilities etc.