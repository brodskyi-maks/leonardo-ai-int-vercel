V "0.1.0"

1. Please document your code appropriately.
2. Set up a NextJS project with TypeScript.
3. Ensure your project is set up with git.
4. Use the ChakraUI component library for UI elements.
5. Ensure your product is responsive for mobile and desktop.
6. Have a blocking element (page / modal / etc) that prevents access to all other pages and data:
   a. On this blocking element, get from the user a username and job title.
   b. Save the user’s username and job title information, in a way you best see fit, so the
   data persists between reloads.
   i. A user must be able to view this information somewhere in full once the
   username and job title information have been entered.
   ii. A user must be able to change this information after it has been submitted.
7. Use Apollo client to query a public GraphQL API.
   a. Ensure that you pick a GraphQL API and data structure that provides images. b. Ensure the data and images are displayed.
8. Display the GraphQL API data as a paginated list of items on an “Information Page”.
9. A user must be able to directly link (via URL) to a specific page of the paginated data.
10. Whenanitemisclickedonthe“InformationPage”,itmustopenamodalthatdisplaysthe
    information about that item.
11. Deploy on Vercel free tier.
