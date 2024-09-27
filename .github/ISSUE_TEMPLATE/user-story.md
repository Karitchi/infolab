---
name: User Story
description: A template for capturing user stories with detailed requirements and specifications.
title: ""
labels: ''
assignees: ''
body:
  - type: markdown
    attributes:
      value: "## Welcome!"
  
  - type: markdown
    attributes:
      value: |
        Thanks for taking the time to fill out this user story! Please provide the necessary details below.

  - type: input
    id: user_story_title
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
  
  - type: checkboxes
    id: additional_notes
    attributes:
      label: Additional Notes
      description: "Select any relevant notes or considerations."
      options:
        - label: "This user story impacts other functionalities."
        - label: "This story needs design review."
        - label: "Test cases need to be written."
---
