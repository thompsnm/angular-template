node() {

  checkout scm
  def buildImage = docker.image('thompsnm/nodejs-chrome:carbon')
  def testImage = docker.image('thompsnm/nodejs-chrome-xvfb:carbon')
  buildImage.pull()
  testImage.pull()

  buildImage.inside('-v /etc/passwd:/etc/passwd') {

    withEnv([
      /* Override the npm cache directory to avoid: EACCES: permission denied, mkdir '/.npm' */
      'npm_config_cache=npm-cache'
    ]) {

      stage('Install Dependencies') {
        sh 'npm install'
      }

      stage('Lint') {
        sh 'npm run lint'
      }

      stage('Unit Test') {
        sh 'npm run test:coverage'
      }

      stage('Build') {
        sh 'npm run build'
      }

    }

  }

  stage('E2E Test') {
    sh "docker run --rm -v ${WORKSPACE}:/protractor/project ${TEST_IMAGE_ID} npm run e2e"
  }

}
