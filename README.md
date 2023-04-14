# React Customer Manager Using Firebase

## Background

The purpose of this document is to outline the technical requirements, architecture, data model, and design/user interface of a React application that retrieves customer data from Firebase Firestore and displays it. The application allows users to filter customers by their location region and search for a customer by their name. It also ensures the data is protected from unauthenticated users and redirects them to the login page.

## Requirements

The following are the functional and non-functional requirements for the customer data React application:

### Functional Requirements:

- The application should retrieve customer data from Firebase Firestore.
- The application should display customer data in a table format.
- The application should allow users to filter customers by their location region.
- The application should allow users to search for a customer by their name.
- The application should authenticate users and redirect them to the login page if unauthenticated.

### Non-Functional Requirements:

- The application should be secure, protecting the customer data from unauthorized access.
- The application should be responsive and easy to use.
- The application should be scalable and maintainable.


## Architecture

The architecture of the customer data React application is a client-server model. The client is built using React, and the server uses Firebase to store and retrieve customer data. The client makes requests to the server using the Firebase API to retrieve customer data, and the server responds with the requested data.

![System Architecture](https://user-images.githubusercontent.com/56351143/231938702-f6bd8d60-c28f-4187-b046-645e7d887660.png)

## Data Model

The customer data is stored in a Firestore database, with each customer represented by a document in a collection. The document contains fields for the customer's name, location, contact information, and other relevant data. The application retrieves the customer data using the Firebase API and displays it in a table format.


## Design

The design of the customer data React application should be responsive and easy to use. The user interface should allow users to filter customers by their location region and search for a customer by their name. The table format should display relevant customer data such as their name, contact information, and location. The application should have a clean, modern design with clear navigation and user-friendly interactions.

## Implementation

### Login Page

![image](https://user-images.githubusercontent.com/56351143/231938892-85feab36-2fd9-4ec7-a674-f2144ab2ef10.png)

### Main page

![image](https://user-images.githubusercontent.com/56351143/231939009-b3274749-767b-49a8-b1a6-971d7429979d.png)
