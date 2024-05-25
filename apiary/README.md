# Apiary API

## Description
Briefly describe what your API does and its purpose.

## Table of Contents
* Installation
* Usage
* Endpoints

Provide instructions on how to install and set up your API. Include any dependencies that need to be installed and how to do so.

### Installation
Run in intellij or in console ./gradlew bootRun

### Usage
Explain how to use your API, including example requests and responses. You may want to include code snippets or examples here.

### Endpoints
List all the endpoints available in your API along with a brief description of each one and how to use them.

1. #### /api/hives
* Description: This endpoint allows you to retrieve information about hives.
* Method: GET
* Parameters: None

Example response:
```
[
    {
        "id": 1,
        "name": "Hive 1",
        "queen": "Queen Bee 1",
        "corps": [
            {
                "id": 5,
                "framesBlack": 5,
                "framesBrown": 3,
                "framesWhite": 7,
                "framesEmpty": 2,
                "hiveId": 1
            },
            {
                "id": 6,
                "framesBlack": 4,
                "framesBrown": 6,
                "framesWhite": 5,
                "framesEmpty": 1,
                "hiveId": 1
            }
        ],
        "notes": [
            {
                "id": 5,
                "date": "2024-05-24T12:00:00.000+00:00",
                "text": "Checked hive, everything looks good.",
                "hiveId": 1,
                "honey": 10,
                "syrup": 5
            },
            {
                "id": 6,
                "date": "2024-05-25T14:30:00.000+00:00",
                "text": "Added new frames to the hive.",
                "hiveId": 1,
                "honey": 0,
                "syrup": 0
            }
        ]
    },
    {
        "id": 2,
        "name": "Hive 1",
        "queen": "Queen Bee 1",
        "corps": [],
        "notes": []
    }
]
```

2. #### /api/hives/{id}
* Description: This endpoint allows you to retrieve information about one hive.
* Method: GET
* Parameters: Id of the hive

Example response:
```
{
    "id": 3,
    "name": "Hive 1",
    "queen": "Queen Bee 1",
    "corps": [],
    "notes": []
}
```

Hive with the given id doesn't exist: 404 Not Found

3. #### /api/hives
* Description: Add new hive
* Method: POST
* Parameters: None
* Body:
```
{
    "name": "Hive 1",
    "queen": "Queen Bee 1",
    "corps": [
        {
            "framesBlack": 5,
            "framesBrown": 3,
            "framesWhite": 7,
            "framesEmpty": 2
        }
    ],
    "notes": [
        {
            "date": "2024-05-24T12:00:00.000+00:00",
            "text": "Checked hive, everything looks good.",
            "honey": 10,
            "syrup": 5
        }
    ]
}
```
Corps and notes can be empty lists.

Example response:
```
{
    "id": 8,
    "name": "Hive 1",
    "queen": "Queen Bee 1",
    "corps": [
        {
            "id": 11,
            "framesBlack": 5,
            "framesBrown": 3,
            "framesWhite": 7,
            "framesEmpty": 2,
            "hiveId": 8
        }
    ],
    "notes": [
        {
            "id": 11,
            "date": "2024-05-24T12:00:00.000+00:00",
            "text": "Checked hive, everything looks good.",
            "hiveId": 8,
            "honey": 10,
            "syrup": 5
        }
    ]
}
```


4. #### /api/hives/{id}
* Description: Edit existing hive
* Method: PUT
* Parameters: Id of the hive
* Body:
```
{
    "name": "Hive 9",
    "queen": "Queen Bee 9",
    "corps": [
        {
            "framesBlack": 5,
            "framesBrown": 3,
            "framesWhite": 7,
            "framesEmpty": 2
        }
    ],
    "notes": [
        {
            "date": "2024-05-24T12:00:00.000+00:00",
            "text": "Checked hive, everything looks good.",
            "honey": 10,
            "syrup": 5
        }
    ]
}
```
Corps and notes can be empty lists.

Example response:
```
{
    "id": 9,
    "name": "Hive 9",
    "queen": "Queen Bee 9",
    "corps": [
        {
            "id": 14,
            "framesBlack": 5,
            "framesBrown": 3,
            "framesWhite": 7,
            "framesEmpty": 2,
            "hiveId": 9
        }
    ],
    "notes": [
        {
            "id": 14,
            "date": "2024-05-24T12:00:00.000+00:00",
            "text": "Checked hive, everything looks good.",
            "hiveId": 9,
            "honey": 10,
            "syrup": 5
        }
    ]
}
```
