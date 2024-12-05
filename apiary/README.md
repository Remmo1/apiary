# Apiary API

## Description
Basic API for apiary functions. It works with hives, corps, notes and seasons.

## Table of Contents
* Installation
* Endpoints and usage

### Installation
Run in intellij or in console ./gradlew bootRun

### Endpoints and usage

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

5. #### /api/hives/{id}
* Description: Delete existing hive
* Method: DELETE
* Parameters: Id of the hive

Responses:
* 200 - Hive deleted successfully
* 404 - Hive not found

6. #### /api/seasons
* Description: This endpoint allows you to retrieve information about seasons.
* Method: GET
* Parameters: None

Example response:
```
[
    {
        "id": 1,
        "name": "Spring 2024",
        "startDate": "2024-03-20T00:00:00.000+00:00",
        "endDate": "2024-06-21T00:00:00.000+00:00",
        "honey": 20,
        "syrup": 10
    },
    {
        "id": 3,
        "name": "Summer 2024",
        "startDate": "2024-06-22T00:00:00.000+00:00",
        "endDate": "2024-09-21T00:00:00.000+00:00",
        "honey": 10,
        "syrup": 5
    }
]
```
WARNING: Can consume time, syrup and honey is counting inside this method.

7. #### /api/seasons
* Description: Add new season
* Method: POST
* Parameters: None
* Body:
```
{
    "name": "Summer 2024",
    "startDate": "2024-06-22T00:00:00Z",
    "endDate": "2024-09-21T00:00:00Z"
}
```
WARNING: Do NOT provide honey and syrup in this request, it will always be set to zero.

Example response:
```
{
    "id": 3,
    "name": "Summer 2024",
    "startDate": "2024-06-22T00:00:00.000+00:00",
    "endDate": "2024-09-21T00:00:00.000+00:00",
    "honey": 0,
    "syrup": 0
}
```
WARNING: As mentioned above, honey and syrup is counted in GET method, not here. 

8. #### /api/sesons/{id}
* Description: Delete existing season
* Method: DELETE
* Parameters: Id of the season

Responses:
* 200 - Season deleted successfully
* 404 - Season not found

9. #### /api/works
* Description: This endpoint allows you to retrieve information about works (notes).
* Method: GET
* Parameters: None

```
[
    {
        "id": 50,
        "date": "2024-07-17T22:00:00.000+00:00",
        "name": null,
        "text": "Zebrano miód",
        "hiveId": 4,
        "honey": 6,
        "syrup": 3
    },
    {
        "id": 87,
        "date": "2024-12-05T12:00:00.000+00:00",
        "name": "pylek_2",
        "text": "Zebrano pylek",
        "hiveId": -1,
        "honey": 2,
        "syrup": 3
    }
]
```

10. #### /api/works/{id}
* Description: This endpoint allows you to retrieve information about one work (note).
* Method: GET
* Parameters: Id of the note

```
[
    {
        "id": 85,
        "date": "2024-12-05T12:00:00.000+00:00",
        "name": "pylek_2",
        "text": "Zebrano pylek",
        "hiveId": 2,
        "honey": 2,
        "syrup": 3
    }
]
```

Work (note) with the given id doesn't exist: 404 Not Found

11. #### /api/works
* Description: Add new work (note)
* Method: POST
* Parameters: None
* Body:
```
{
    "date": "2024-12-05T12:00:00.000+00:00",
    "name": "pylek_3",
    "text": "Zebrano pylek z pasieki",
    "hiveId": 1,
    "honey": 2,
    "syrup": 3
}
```

When hive with the given Id doesn't exists, there's no error. In response there will be -1 in hiveId.

Example response:
```
{
    "id": 89,
    "date": "2024-12-05T12:00:00.000+00:00",
    "name": "pylek_3",
    "text": "Zebrano pylek z pasieki",
    "hiveId": 1,
    "honey": 2,
    "syrup": 3
}
```

12. #### /api/works/{id}
* Description: Edit existing work (note)
* Method: PUT
* Parameters: Id of the work (note)
* Body:
```
{
    "date": "2024-07-17T22:00:00.000+00:00",
    "name": "Praca przy miodzie",
    "text": "Zebrano miód",
    "hiveId": 4,
    "honey": 6,
    "syrup": 3
}
```

BE CAREFUL!!!! 
You can change hiveId as well, without any problems. If the given hive id doesn't exists then you'll receive -1.

Example response:
```
{
    "id": 50,
    "date": "2024-07-17T22:00:00.000+00:00",
    "name": "Praca przy miodzie",
    "text": "Zebrano miód",
    "hiveId": 4,
    "honey": 6,
    "syrup": 3
}
```
13. #### /api/works/{id}
* Description: Delete existing work (note)
* Method: DELETE
* Parameters: Id of the work (note)

Responses:
* 200 - Work (note) deleted successfully
* 404 - Work (note) not found
