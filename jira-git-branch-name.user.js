// ==UserScript==
// @name         Jira git branch name
// @namespace    https://github.com/raszi/userscripts
// @version      0.1
// @description  Add automatic branch name generation to Jira tickets
// @author       István Karaszi
// @match        https://*.atlassian.net/*
// @icon         https://www.atlassian.com/favicon-16x16.png
// @grant        GM_log
// ==/UserScript==

/* global JIRA */
(() => {
  'use strict';

  const queryByTestId = (testId) => `[data-testid="${testId}"]`;

  const guessPrefix = (ticketInfo) => {
    const { type, title } = ticketInfo;

    const mapping = {
      bug: 'fix',
      task: 'feat'
    };

    const exactType = mapping[type];
    if (exactType) {
      return exactType;
    }

    const fuzzyMatches = {
      docs: /doc(umentation|s)?\b/i,
      chore: /tech.?debt/i,
      test: /test/i
    };

    const match = Object.entries(fuzzyMatches).find(([, regex]) => title.match(regex));
    return match ? match[0] : 'feat';
  };

  const makeShortDescription = (title) =>
    title
      .replace(/\[.*?\]/g, '')
      .replace(/\(.*?\)/g, '')
      .replace(/\b(urgent|important|fe|be)\b/g, ' ')
      .replace(/\W/g, ' ')
      .trim()
      .replace(/\s+/g, '_')
      .toLowerCase();

  const makeBranchName = (ticketInfo) => {
    const { issueKey, title } = ticketInfo;

    const prefix = guessPrefix(ticketInfo);
    const description = makeShortDescription(title);

    return `${prefix}/${issueKey}-${description}`;
  };

  const getTicketInfo = (branchCommand) => {
    if (!branchCommand) {
      GM_log('Branch command is empty');
      return;
    }

    const issueContainer = document.querySelector(queryByTestId('issue.views.issue-base.foundation.breadcrumbs.breadcrumb-current-issue-container'));

    if (!issueContainer) {
      GM_log('Could not find issue container');
      return;
    }

    const heading = document.querySelector(queryByTestId('issue.views.issue-base.foundation.summary.heading'));

    if (!heading) {
      GM_log('Could not find issue heading');
      return;
    }

    GM_log({ branchCommand });

    const matches = branchCommand.match(/git checkout -b (\w+-\d+)/);
    const issueKey = matches ? matches[1] : '??-????';

    // JIRA.Issue.getIssueKey()
    // JIRA.IssueNavigator.getSelectedIssueKey()
    // GH.WorkSelectionController.getSelectedIssueKey()

    return {
      type: issueContainer.querySelector('img').getAttribute('alt').toLowerCase(),
      issueKey,
      title: heading.textContent
    };
  };

  const changeBranchName = () => {
    const branchDropDown = document.querySelector(queryByTestId('development-summary-branch.ui.create-branch-dropdown.menu-group'));

    if (!branchDropDown) {
      GM_log('Branch dropdown is not open');
      return;
    }

    const branchCommandField = branchDropDown.querySelector(queryByTestId('platform-copy-text-field.textfield--'));

    if (!branchCommandField) {
      GM_log('Could not find branch command field');
      return;
    }

    const ticketInfo = getTicketInfo(branchCommandField.value);

    if (!ticketInfo) {
      GM_log('Could not fetch the ticket information');
      return;
    }

    const branchName = makeBranchName(ticketInfo);

    branchCommandField.value = `git checkout -b ${branchName}`;
  };

  // document.querySelector(queryByTestId('development-summary-branch.ui.create-branch-command-button.create-branch-command-button'));

  // FIXME: get a better event
  document.addEventListener('click', changeBranchName);
})();
