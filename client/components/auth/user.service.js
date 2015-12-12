'use strict';

angular.module('abroadathletesApp')
  .factory('User', function ($resource) {
    return $resource('/api/users/:id/:controller', {
      id: '@_id'
    },
    {
      changePassword: {
        method: 'PUT',
        params: {
          id: '@id',
          controller:'password'
        }
      },
      putDataFromCreator:{
        method: 'PUT',
        params: {
          controller:'complete',
          id:''
        }
      },
      changeMembership: {
        method: 'POST',
        params: {
          controller:'changeMembership'
        }
      },
      get: {
        method: 'GET',
        params: {
          id:'me'
        }
      },
      getUsers: {
        method: 'GET',
        isArray: true,
        params: {
        }
      },
      getTeams: {
        method: 'GET',
        isArray: true,
        params: {
          kind: 'team'
        }
      },
      getUser: {
        method: 'GET',
        params: {
        }
      },
      assignTo: {
        method: 'POST',
        params: {
          controller:'assign'
        }
      },
      addToTeam: {
        method: 'POST',
        params: {
          controller:'addToTeam'
        }
      },
      addToTeamAsAdmin: {
        method: 'POST',
        params: {
          controller:'addToTeamAsAdmin'
        }
      },
      leave: {
        method: 'POST',
        params: {
          controller:'leave'
        }
      },
      delete: {
        method: 'GET',
        params: {
            controller:'delete'
        }
      },
      removeFromTeam: {
        method: 'POST',
        params: {
          controller:'removeFromTeam'
        }
      },
      grantStatsAdmin: {
        method: 'POST',
        params: {
          controller:'grantStatsAdmin'
        }
      },
      revokeStatsAdmin: {
        method: 'POST',
        params: {
          controller:'revokeStatsAdmin'
        }
      },
      grantRosterAdmin: {
        method: 'POST',
        params: {
          controller:'grantRosterAdmin'
        }
      },
      revokeRosterAdmin: {
        method: 'POST',
        params: {
          controller:'revokeRosterAdmin'
        }
      },
      getUserStatsAdmins: {
        method: 'GET',
        params: {
          controller: 'getUserStatsAdmins'
        }
      },
      getUserRosterAdmins: {
        method: 'GET',
        params: {
          controller: 'getUserRosterAdmins'
        }
      },
      getUserManagesStats: {
        method: 'GET',
        params: {
          controller: 'getUserManagesStats'
        }
      },
      getUserManagesRoster: {
        method: 'GET',
        params: {
          controller: 'getUserManagesRoster'
        }
      },
      getUserByTeam: {
        method: 'GET',
        params: {
          controller:'getUserByTeam'
        }
      },
      getUsersAndFollowersByTeam: {
        method: 'GET',
        params: {
          controller:'getUsersAndFollowersByTeam'
        }
      },
      getUserFriends: {
        method: 'GET',
        params: {
          controller:'getUserFriends'
        }
      },
      inviteToFriends: {
        method: 'POST',
        params: {
          controller:'friends'
        }
      },
      acceptInvitation: {
        method: 'POST',
        params: {
          controller:'acceptInvitation'
        }
      },
      rejectInvitation: {
        method: 'POST',
        params: {
          controller:'rejectInvitation'
        }
      },
      getInvitations: {
        method: 'GET',
        isArray: true,
        params: {
          controller:'getInvitations'

        }
      },
      getNotifications: {
        method: 'GET',
        isArray: true,
        params: {
          controller:'getNotifications'
        }
      },
      getNewNotifications: {
        method: 'GET',
        isArray: true,
        params: {
          controller:'getNewNotifications'
        }
      },
      updateNotifications: {
        method: 'POST',
        params: {
          controller:'updateNotifications'
        }
      },
      followUser: {
        method: 'POST',
        params: {
          controller:'followUser'
        }
      },
      unFollowUser: {
        method: 'POST',
        params: {
          controller: 'unFollowUser'
        }
      },
      unFriendUser: {
        method: 'POST',
        params: {
          controller: 'unFriendUser'
        }
      },
      createUserByTeam: {
        method: 'POST',
        params: {
            controller: 'createUserByTeam'
        }
      },
      getAssignRequests: {
        method: 'GET',
        isArray: true,
        params: {
          controller: 'getAssignRequests'
        }
      },
      getAssignRequestsAsAdmin: {
        method: 'GET',
        isArray: true,
        params: {
          controller: 'getAssignRequestsAsAdmin'
        }
      },
      getUserById: {
        method: 'GET',
        isArray:false,
          params: {
              controller:'getUserById'
          }
      },
      acceptAssignRequests: {
        method: 'POST',
        params: {
          controller:'acceptAssignRequest'
        }
      },
      acceptRecruitRequest: {
        method: 'POST',
        params: {
          controller:'acceptRecruitRequest'
        }
      },
      rejectAssignRequests: {
        method: 'POST',
        params: {
          controller:'rejectAssignRequest'
        }
      },
      rejectRecruitRequest: {
        method: 'POST',
        params: {
          controller:'rejectRecruitRequest'
        }
      },
      getNewGameData: {
        method: 'GET',
        params: {
          controller: 'getNewGameData'
        }
      },
      search: {
        method: 'GET',
        isArray: true,
        params: {
          controller: 'search'
        }
      },
      updateStats: {
        method: 'POST',
        params: {
          controller: 'updateStats'
        }
      },
      updateProfile: {
        method: 'POST',
        params: {
          controller: 'updateProfile'
        }
      },
      trackUser: {
        method: 'POST',
        params: {
          id: '',
          controller: 'trackUser'
        }
      },
      getMyTeams: {
        method: 'GET',
        isArray: true,
        params: {
          controller:'myTeams'

        }
      },
      getAllTeams: {
        method: 'GET',
        isArray: true,
        params: {
          controller:'getAllTeams'
        }
      },
      getAllLeagues: {
        method: 'GET',
        isArray: true,
        params: {
          controller:'getAllLeagues'
        }
      },
      getAllHumanUsers: {
        method: 'GET',
        isArray: true,
        params: {
          controller:'getAllHumanUsers'
        }
      }
	  });
  });
