<template>
	<div>

	</div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      errorServerMessage: ''
    }
  },
};
</script>

<style lang="scss">
form {
  padding: 10px;
  display: block;
  position: relative;
  margin-bottom: 0;

  h3 {
	  color: aliceblue;
  }

  &:before {
    content: " ";
    background-color: #6d7782;
    display: block;
    position: absolute;
    opacity: 0.6;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    border-radius: 5px;
  }

  label {
    color: white;
    font-weight: 700px;
  }

  small {
    &.text-muted {
      color: bisque !important;
      font-style: italic;
    }
  }

  .invalid-feedback {
	  color: #fb788f;
    text-shadow: 1px 1px 2px black, 0 0 1em red;
    font-style: italic;
	  font-weight: 300;

    &.server {
      display: block;
      text-align: center;
    }
  }

  .button-loader {
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: flex-end;

    button[type=submit] {
      margin-left: 10px
    }
  }
}
</style>