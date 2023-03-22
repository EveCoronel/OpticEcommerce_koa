let
  nodeVersion = "18.15.0";
  nodePackages = import (builtins.fetchTarball {
    url = "https://github.com/nixos/nixpkgs/archive/21.05.tar.gz";
  }) {
    config.allowUnfree = true;
    config = { packageOverrides = pkgs: with pkgs; {
      nodejs = nodejs-14_x.override { version = nodeVersion; };
    }; };
  };
in nodePackages
