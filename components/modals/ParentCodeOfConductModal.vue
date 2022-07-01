<template>
  <ModalWrapper>
    <template #heading="headingProps">
      <h2
        class="mb-8"
        v-bind="headingProps"
      >
        Code of Conduct - Spectators, Parents and Carers
      </h2>
    </template>

    <template #body>
      <div class="text-sm">
        <p class="mb-4">We all bear a collective responsibility to set a good example and help provide a positive environment in which children can learn and enjoy the game. Play your part and observe The FA's respect Code of Conduct for spectators at all times.</p>
        <p class="mb-4">I will:</p>
        <ul
          class="list-disc pl-10 mb-4"
          role="list"
        >
          <li>Remember that children play for FUN</li>
          <li>Applaud effort and good play as well as success</li>
          <li>Respect the Referee's decisions even when you don't agree with them</li>
          <li>Appreciate good play whatever team it comes from</li>
          <li>Remain behind the touchline and within the designated spectator's area</li>
          <li>Let the coach do their job and not confuse the players by telling them what to do</li>
          <li>Encourage the players to respect the opposition, referee and match officials</li>
          <li>Support positively and offer players encouragement not criticism</li>
          <li>Never engage in, or tolerate offensive, insulting or abusive language or behaviour</li>
        </ul>
        <p class="mb-4">I understand that if I do not follow the Code, any/all the following actions may be taken:</p>
        <p class="mb-4">I may be:</p>
        <ul
          class="list-disc pl-10 mb-4"
          role="list"
        >
          <li>Issued with a verbal warning from the club or league official</li>
          <li>Required to meet with the club, league, or club welfare officer</li>
          <li>Obliged to undertake an FA education course</li>
          <li>Obliged to leave the match venue by the club</li>
          <li>Requested by the club not to attend future games</li>
          <li>Suspended or have my club membership removed</li>
          <li>Required to leave the club along with any dependents</li>
        </ul>
        <p class="mb-4">In addition:</p>
        <ul
          class="list-disc pl-10"
          role="list"
        >
          <li>The FA/County FA could impose a fine and/or suspension on the club</li>
        </ul>
      </div>
    </template>
  </ModalWrapper>
</template>

<script>
export default {
  name: 'ParentCodeOfConductModal',

  components: {
    ModalWrapper: () => import('./ModalWrapper.vue'),
  },
};
</script>
