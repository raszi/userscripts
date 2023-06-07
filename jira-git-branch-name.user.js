// ==UserScript==
// @name         Jira git branch name
// @namespace    https://github.com/raszi/userscripts
// @version      0.1
// @description  Add automatic branch name generation to Jira tickets
// @author       István Karaszi
// @match        https://*.atlassian.net/*
// @icon         https://www.atlassian.com/favicon-16x16.png
// @grant        GM_setClipboard
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

  const getTicketInfo = () => {
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

    // JIRA.Issue.getIssueKey()
    // JIRA.IssueNavigator.getSelectedIssueKey()
    // GH.WorkSelectionController.getSelectedIssueKey()

    return {
      type: issueContainer.querySelector('img').getAttribute('alt').toLowerCase(),
      issueKey: JIRA.Issue.getIssueKey(),
      title: heading.textContent
    };
  };

  const applyBranchStyles = (style) => {
    style.color = '#0969da';
    style.backgroundColor = '#ddf4ff';
    style.fontFamily = 'ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace';
    style.fontSize = '0.85em';
    style.lineHeight = '1.8';
    style.borderRadius = '6px';
    style.whiteSpace = 'nowrap';
    style.padding = '0 4px';
  };

  const createBranchNode = () => {
    const branchTag = document.createElement('a');

    branchTag.setAttribute('data-testid', 'branch-name');

    applyBranchStyles(branchTag.style);

    return branchTag;
  };

  const addBranchName = () => {
    const navBar = document.querySelector('#jira-issue-header nav[aria-label="Breadcrumbs"]');

    if (!navBar) {
      GM_log('Could not find the breadcrumbs');
      return;
    }

    navBar.style.display = 'flex';

    const existingNode = navBar.querySelector(queryByTestId('branch-name'));

    if (existingNode) {
      existingNode.parentNode.removeChild(existingNode);
    }

    const ticketInfo = getTicketInfo();

    if (!ticketInfo) {
      GM_log('Could not fetch the ticket information');
      return;
    }

    const branchName = makeBranchName(getTicketInfo());
    const branchTag = createBranchNode();

    branchTag.appendChild(document.createTextNode(branchName));
    branchTag.addEventListener('click', () => GM_setClipboard(branchName));

    navBar.appendChild(branchTag);
  };

  // FIXME: get a better event
  document.addEventListener('click', addBranchName);
})();
