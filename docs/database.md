# Database

The document describes OpenTrials `database` design.

## Technology

Database engine: `postgresql-9.4+`.

## Data Model

### Basics

Design compliance clients:
- WHO Trial Registration Data Set - http://www.who.int/ictrp/network/trds/en/
- OpenTrials API/Apps
- OpenTrials architecture

Design patterns:
- `uuid` as primary keys + unique constraint on natural keys.
- data entegrity - relathiohip table is prefered way over array or json.
- minimum nullable fields - make fields nullable only if there is a good reason.
- because of data inconsistency from the different sources `type` and `data` fields
are used for many entities. `data` is a freejson with strcuture depends on `type`.
- for trial relationships `role` and `context` fields are used. E.g. some person
could play `principal_inbestigator` role for the trial with `context` including
phone and email he uses for this trial as contact information.

### Tables

Meta tables:
- source - the source of the data (e.g. `nct` register)

Main tables:
- trial - main entity of the data model
- record - a record about something (e.g. `trial`) from the warehouse
- publication - any publication related to a trial
- document - any document related to a trial

Reference tables:
- problem - health condition or problem studied (e.g. `cold`)
- intervention - problem influencer studied (e.g. `some drug`)
- location - any location related to a trial
- organisation - any organisation related to a trial
- person - any person related to a trial

Relationship tables:
- trial\_\* - a trial relationship

### ER Diagram

![diagram](https://raw.githubusercontent.com/opentrials/warehouse/master/docs/database.png)

### Schema Declaration

https://github.com/opentrials/warehouse/blob/master/warehouse/database/schema.py

### Warehouse-to-Database Script Example

https://github.com/opentrials/warehouse/blob/master/warehouse/database/nct.py

### Test Dump

https://raw.githubusercontent.com/opentrials/warehouse/master/docs/database.sql

## TODO

Further actions:
- move this document to `database` repository
