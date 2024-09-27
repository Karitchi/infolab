---
name: User Story
about: A template for capturing user stories with detailed requirements and specifications.
title: Title
labels: ''
assignees: ''

---

body:
- type: input
  id: story_title
  attributes:
    label: User Story Title
    description: "Provide a concise title for the user story."
    placeholder: "As a user, I want to..."
  validations:
    required: true

- type: textarea
  id: description
  attributes:
    label: Description
    description: "Explain the user story in detail."
    placeholder: "Add the user story description here."
  validations:
    required: true

- type: textarea
  id: mockups
  attributes:
    label: Mockups
    description: "Link to any relevant mockups or designs."
    placeholder: "Paste links to mockups here."
  
- type: textarea
  id: acceptance_criteria
  attributes:
    label: Acceptance Criteria
    description: "List the criteria that need to be met for the story to be considered complete."
    placeholder: "1. \n2. \n3."
  validations:
    required: true

- type: textarea
  id: prerequisites
  attributes:
    label: Prerequisites (and Dependencies)
    description: "List any prerequisites or dependencies for this user story."
    placeholder: "Any prior tasks or dependencies."
  
- type: textarea
  id: useful_technical_info
  attributes:
    label: Useful Technical Information
    description: "Include any technical details that may assist in implementation."
    placeholder: "Technical information goes here."

- type: textarea
  id: technical_task_list
  attributes:
    label: Technical Task List
    description: "List any specific technical tasks related to this user story."
    placeholder: "1. \n2. \n3."
