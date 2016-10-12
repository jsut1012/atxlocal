<%@ page import="net.sf.json.JSONObject" %>
<%
JSONObject user = (session.getAttribute("USER") != null) ? (JSONObject)session.getAttribute("USER") : new JSONObject();
String username = user.optString("username");
%>

<div class="header-bce">
    <div class="container">
      <div class="navbar header navbar-bce">
          <div class="navbar-inner">
              <div class="pull-left">
                  <a class="btn-header-collapse" data-toggle="collapse" data-target=".navbar-collapse.header-bce-links">
                      <i class="icon-hamburger-menu"></i>
                  </a>
                  <a href="/" title='HomeAway' class="logo">
                      <img src="//csvcus.homeaway.com/rsrcs/cdn-logos/1.9.1/bce/moniker/homeaway_us/logo-bceheader.svg" />
                  </a><br />
                  <div class="pull-right app-title"><lingua:message key="title.translations.portal" /></div>
              </div>
              <div class="collapse header-bce-links navbar-collapse">
                  <ul class="nav navbar-nav" role="navigation">
                        <% if (!username.isEmpty()) { %>
                            <li><a href="/j_spring_security_logout"><lingua:message key="page.logout" /></a></li>
                        <% } else { %>
                            <li><a href="/"><lingua:message key="page.login" /></a></li>
                        <% } %>
                  </ul>
              </div>
          </div>
      </div>
      
      <div class="header-bce-birdhouse-container birdhouse-toggle">
          <div class="flip-container dropdown-toggle" data-toggle="dropdown">
              <div class="flipper">
                  <div class="front btn-bce">
                      <img src="//csvcus.homeaway.com/rsrcs/cdn-logos/1.9.1/bce/moniker/homeaway_us/birdhouse-bceheader.svg" />
                  </div>
              </div>
          </div>
          <div class="dropdown-menu dropdown-menu-bce-about fade">
              <div class="text-right bce-about-logo-wrapper">
                  <img src="//csvcus.homeaway.com/rsrcs/cdn-logos/1.5.1/bce/brand/homeaway/logo-simple.svg"/>
              </div>
          </div>
      </div>
        
    </div>
</div>
<nav class="navbar navbar-inverse">
    <div class="container">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target=".navbar-collapse">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <div class="navbar-brand">Globe Portal</div>
        </div>
        <div class="navbar-collapse collapse">
            <ul class="nav navbar-nav">
              <li class="nav-lnk" id="nav-home-lnk"><a href="/">Home</a></li>
              <li class="nav-lnk dropdown" id="nav-create-lnk">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown"><lingua:message key="btn.create.tr" /><span class="caret"></span></a>
                <ul class="dropdown-menu" role="menu">
                  <li><a href="/ticket/create/lingua"><lingua:message key="title.translation.requests.lingua" /></a></li>
                  <li><a href="/ticket/create"><lingua:message key="title.translation.requests" /></a></li>
                </ul>
              </li>
              <li class="nav-lnk dropdown" id="nav-view-lnk">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown"><lingua:message key="btn.view.tr" /><span class="caret"></span></a>
                <ul class="dropdown-menu" role="menu">
                  <li><a href="/ticket/view/lingua"><lingua:message key="title.translation.requests.lingua" /></a></li>
                  <li><a href="/ticket/view"><lingua:message key="title.translation.requests" /></a></li>
                </ul>
              </li>
            </ul>
        </div>
    </div>
</nav>
      
