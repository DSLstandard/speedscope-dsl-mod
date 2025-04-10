{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";
  };

  outputs = { self, nixpkgs }:
  let
    system = "x86_64-linux";
    pkgs = nixpkgs.legacyPackages.${system};
    lib = pkgs.lib;
  in
  {
    devShells.${system}.default =
      let
        libInputs = with pkgs; [
          zlib
        ];
      in
        pkgs.mkShell {
          buildInputs = with pkgs; [
            nodejs
          ] ++ libInputs;
          LD_LIBRARY_PATH = lib.makeLibraryPath ([pkgs.stdenv.cc.cc.lib] ++ libInputs);
        };
  };
}
