# shopping-list-BE

This project provides the backend for the shopping list app. It has been deployed by AWS Lambda with AWS API Gateway and the data has been saved to DynamoDB.
{:.center}
![Screen Shot 2021-06-29 at 8 38 55 PM](https://user-images.githubusercontent.com/40383416/123768706-ac6bf500-d91c-11eb-9247-fa0d02e54471.png)


## API available: 

### Get Items from shopping list: HTTP GET https://9yqwagzscg.execute-api.ap-southeast-2.amazonaws.com/items

### Add a single item to shopping list: HTTP POST https://9yqwagzscg.execute-api.ap-southeast-2.amazonaws.com/items  with body {"name":"Coffee","quantity":"2"}

### Update existing item: HTTP PUT https://9yqwagzscg.execute-api.ap-southeast-2.amazonaws.com/items/574c0b6b- bcd2-45b9-b6a3-c111557287fe With body {"name":"Apple","quantity":"10"}

### Delete Item: Delete item: HTTP DELETE https://9yqwagzscg.execute-api.ap-southeast-2.amazonaws.com/items/574c0b6b- bcd2-45b9-b6a3-c111557287fe


## DB structure
![Screen Shot 2021-06-29 at 8 55 23 PM](https://user-images.githubusercontent.com/40383416/123768305-54cd8980-d91c-11eb-8f35-396d87810922.png)

The main reason I chose Dynamo DB is the scalability and compatibility with AWS. Also, as a shopping list, different items might have different properties. Using NoSQL database can better handle inconsistent schema items. When posting new item to database, the UUID library will automatically generate an id for that item.
.center {
  text-align: center;
}
