<template>
  <aside class="side">
    <div class="sideItem sideProfile">
      <h3 class="sideItemTitle">
        <font-awesome-icon
          :icon="'user'"
          class="followInner__itemIcon"
        />
        Profile
      </h3>
      <div class="sideProfile__image">
        <img
          src="https://images.ctfassets.net/cehw3wy3j8jc/4CzR18vKdFrmnNI8ihxevU/380ec9d71bac06a22dd2d4bdab248d6e/profile3.jpg?h=250"
          alt="プロフィール写真"
        >
      </div>
      <div class="sideProfile__name">
        <p class="sideProfile__nameText">
          {{ $myInfo.nickname }} ({{ $myInfo.name }})
        </p>
        <p class="sideProfile__nameLabel">
          {{ $myInfo.labelMain }}
        </p>
      </div>
      <div class="sideProfile__text">
        <p class="sideProfile__textSentence">
          {{ $myInfo.introduction.first }}
        </p>
        <p class="sideProfile__textSentence">
          {{ $myInfo.introduction.history }}
        </p>
        <p class="sideProfile__textSentence">
          {{ $myInfo.introduction.strongPoints }}
        </p>
        <p class="sideProfile__textSentence">
          {{ $myInfo.introduction.other }}
        </p>
      </div>
      <div class="sideProfile__sns">
        <p class="sideProfile__snsTitle">
          ＼ Follow Me !! ／
        </p>
        <div class="sideProfile__snsList">
          <a
            v-for="(item, index) in items"
            :key="index"
            :href="item.url"
            :class="item.class"
            target="_blank"
            class="sideProfile__snsListItem"
          >
            <font-awesome-icon
              :icon="item.icon"
            />
          </a>
          </li>
        </div>
      </div>
    </div>
  </aside>
</template>

<script>
export default {
  data () {
    return {
      items: [
        {
          url: this.$myInfo.sns.twitter.url,
          icon: ['fab', 'twitter'],
          class: 'sideProfile__snsListItem--twitter',
        },
        {
          url: this.$myInfo.sns.instagram.url,
          icon: ['fab', 'instagram'],
          class: 'sideProfile__snsListItem--instagram',
        },
        {
          url: this.$myInfo.sns.github.url,
          icon: ['fab', 'github'],
          class: 'sideProfile__snsListItem--github',
        },
        {
          url: this.$myInfo.sns.feedly.url,
          icon: ['fas', 'rss'],
          class: 'sideProfile__snsListItem--feedly',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.side {
  &Item {
    @extend %shadow_base;
    background-color: $color_white;
    border-radius: 3px;
    overflow: hidden;
    padding: 1rem 1rem 2rem;

    &Title {
      @extend %font_accent;
      border-bottom: .3rem solid;
      border-image: linear-gradient(to right, $color_navy, $color_blue 50%, $color_green);
      border-image-slice: 1;
      font-size: $fontSize_l;
      letter-spacing: .1rem;
      margin-bottom: 2rem;
      padding-bottom: .3rem;
      text-align: center;
    }
  }

  &Profile {

    &__image {
      @extend %shadow_base;
      border-radius: 10%;
      margin: 0 auto 1rem;
      overflow: hidden;
      width: 150px;
    }

    &__name {
      font-weight: bold;
      text-align: center;

      &Text {
        margin: 0;
      }

      &Label {
        color: $color_gray;
      }
    }

    &__textSentence {
      font-size: $fontSize_s;
    }

    &__sns {
      font-weight: bold;
      text-align: center;

      &Title {
        @extend %font_accent;
        margin-bottom: .5rem;
      }

      &List {
        display: flex;
        justify-content: center;

        &Item {
          @extend %shadow_base;
          border-radius: 15%;
          color: $color_white;
          font-size: $fontSize_l;
          line-height: 1;
          margin: 0 .5rem;
          padding: .5rem;

          &:hover {
            @extend %shadow_base_hover;
          }

          &--twitter {
            background-color: $color_twitter;
          }

          &--instagram {
            background: $color_instagram;
          }

          &--github {
            background-color: $color_github;
          }

          &--feedly {
            background-color: $color_feedly;
          }
        }
      }
    }
  }
}
</style>
