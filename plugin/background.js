let currentWindow = false;
const starTabs = new Map();
let showStarTabs = false;
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWYzZGI2Y2U1YmJhOTYwNTE3Y2NjNDUiLCJlbWFpbCI6InNhbWJoYXZqYWluMjMzQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoic2FtYmhhdiIsImlhdCI6MTcxMDU3ODMzMSwiZXhwIjoxNzEwNjY0NzMxfQ.9vhbcPTr3UijABiFPS0l6mkesgZyffaBi97obyLKRd4";

//maps for closing and hibernating tabs after certain limits reached
const tabsCode = new Map();
const tabCloseTime = new Map();
let currentTabId = null;
const time = 30; // time in seconds
const action = "null";

(async () => {
  chrome.runtime.onConnect.addListener(function (port) {
    console.assert(port.name === "tabify");
    port.onMessage.addListener(function (msg) {
      const { id } = msg;
      switch (id) {
        case 1:
          sendAllTabs(id);
          break;
        case 2:
          DeleteParticularTab(id, msg.tabId);
          break;
        case 3:
          PinParticularTab(id, msg.tabId);
          break;
        case 4:
          UnpinParticularTab(id, msg.tabId);
          break;
        case 5:
          DuplicateParticularTab(id, msg.tabId);
          break;
        case 7:
          changeActiveTab(id, msg.tabId, msg.windowId);
          break;
        case 8:
          ArrangeTabsInAlphabeticalOrder();
          break;
        case 9:
          closeAllTabsExcept(msg.tabId);
          break;
        // case 11:
        //   // moveTabTOExtremeRight(msg.tabId);
        //   starMarkATab(msg.tabId);
        //   break;
        case 12:
          removeDuplicateTabs(msg.tabs);
          break;
        case 13:
          changeCurrentWindowVariable(msg.value);
          break;
        case 14:
          sendCurrentWindowVariable();
          break;
        case 15:
          bookamarkParticularTab(msg.tabId);
          break;
        case 16:
          OpenTabInIncognitoMode(msg.tabId);
          break;
        case 17:
          OpenTabInNewWindow(msg.tabId);
          break;
        case 18:
          UnbookmarkTab(msg.tabUrl);
          break;
        case 19:
          starMarkATab(msg.tabId);
          break;
        case 20:
          starUnmarkAtab(msg.tabId);
          break;
        case 21:
          getStarTabVariable();
          break;
        case 22:
          setStarVariable(msg.value);
          break;
        case 23:
          createGroup(msg.groupName);
          break;
        case 24:
          getAllUserGroups();
          break;
        case 25:
          addTabToGroup(msg.tab, msg.groupId);
          break;
        case 26:
          getTabsOfGroup(msg.groupId);
          break;
        case 27:
          addTabToWorkingAreaByUrl(msg.url);
          break;
        case 28:
          deleteTabOfGroup(msg.tabId, msg.groupId);
          break;
        case 29:
          openAllGroupTabs(msg.groupId);
          break;
        case 30:
          deleteGroup(msg.groupId);
          break;
        case 31:
          addGroupUsingLink(msg.url);
          break;
        case 32:
          ArrangeTabsInAlphabeticalOrder();
          break;
        case 33:
          sortTabsByLastAccessed();
          break;
      }
    });